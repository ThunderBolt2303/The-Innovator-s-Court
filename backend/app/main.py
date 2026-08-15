from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import httpx

from app.core.config import settings
from app.api.routes import api_router
from app.db.database import engine, Base
from app.services.ml_service import ml_pipeline
from app.services.synthetic_data import generate_initial_training_data, generate_live_synthetic_data

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For prototyping
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

# Background task to generate synthetic data for the prototype
async def synthetic_traffic_generator():
    async with httpx.AsyncClient() as client:
        while True:
            await asyncio.sleep(2) # Generate a request every 2 seconds
            data = generate_live_synthetic_data()
            try:
                # Call our own ingest API
                await client.post("http://127.0.0.1:8000/api/v1/ingest/", json=data)
            except Exception as e:
                print(f"Error generating synthetic traffic: {e}")

@app.on_event("startup")
async def startup_event():
    # 1. Train the ML model initially
    print("Training initial Isolation Forest model...")
    training_data = generate_initial_training_data()
    ml_pipeline.train_initial_model(training_data)
    print("Model trained successfully.")
    
    # 2. Start the synthetic traffic generator in the background
    asyncio.create_task(synthetic_traffic_generator())
