from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.pydantic_schemas import LogEventResponse, ThreatStatsResponse
from app.models.db_models import LogEvent
from sqlalchemy import desc

router = APIRouter()

@router.get("/stats", response_model=ThreatStatsResponse)
def get_threat_stats(db: Session = Depends(get_db)):
    total_events = db.query(LogEvent).count()
    normal_count = db.query(LogEvent).filter(LogEvent.threat_level == "Normal").count()
    suspicious_count = db.query(LogEvent).filter(LogEvent.threat_level == "Suspicious").count()
    high_risk_count = db.query(LogEvent).filter(LogEvent.threat_level == "High-Risk").count()
    
    recent_anomalies = db.query(LogEvent).filter(
        LogEvent.threat_level.in_(["Suspicious", "High-Risk"])
    ).order_by(desc(LogEvent.timestamp)).limit(10).all()
    
    return {
        "total_events": total_events,
        "normal_count": normal_count,
        "suspicious_count": suspicious_count,
        "high_risk_count": high_risk_count,
        "recent_anomalies": recent_anomalies
    }

@router.get("/recent", response_model=list[LogEventResponse])
def get_recent_activity(db: Session = Depends(get_db), limit: int = 50):
    return db.query(LogEvent).order_by(desc(LogEvent.timestamp)).limit(limit).all()
