from fastapi import APIRouter
from app.api.endpoints import ingest, threats

api_router = APIRouter()
api_router.include_router(ingest.router, prefix="/ingest", tags=["ingest"])
api_router.include_router(threats.router, prefix="/threats", tags=["threats"])
