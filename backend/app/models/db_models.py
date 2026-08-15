from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from datetime import datetime
from app.db.database import Base

class LogEvent(Base):
    __tablename__ = "log_events"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    source_ip = Column(String, index=True)
    endpoint = Column(String, index=True)
    method = Column(String)
    payload_size = Column(Float)
    response_time = Column(Float)
    status_code = Column(Integer)
    is_anomaly = Column(Boolean, default=False)
    anomaly_score = Column(Float, default=0.0)
    threat_level = Column(String, default="Normal") # Normal, Suspicious, High-Risk
    pattern_match = Column(String, nullable=True) # E.g., "SQLi", "XSS", "BruteForce"
