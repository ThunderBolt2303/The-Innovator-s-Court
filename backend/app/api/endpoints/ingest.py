from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.pydantic_schemas import IngestPayload, LogEventResponse
from app.models.db_models import LogEvent
from app.services.ml_service import ml_pipeline
from app.services.threat_service import assess_threat_level

router = APIRouter()

@router.post("/", response_model=LogEventResponse)
def ingest_activity(payload: IngestPayload, db: Session = Depends(get_db)):
    # 1. AI Detection & Pattern Engine
    analysis_result = ml_pipeline.analyze_request(payload.dict())
    
    # 2. Decision Engine
    threat_level = assess_threat_level(
        anomaly_score=analysis_result['anomaly_score'],
        pattern_match=analysis_result['pattern_match']
    )
    
    # 3. Store the result
    db_event = LogEvent(
        source_ip=payload.source_ip,
        endpoint=payload.endpoint,
        method=payload.method,
        payload_size=payload.payload_size,
        response_time=payload.response_time,
        status_code=payload.status_code,
        is_anomaly=analysis_result['is_anomaly'],
        anomaly_score=analysis_result['anomaly_score'],
        pattern_match=analysis_result['pattern_match'],
        threat_level=threat_level
    )
    
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    return db_event
