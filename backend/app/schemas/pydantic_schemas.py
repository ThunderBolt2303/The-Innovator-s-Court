from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class IngestPayload(BaseModel):
    source_ip: str
    endpoint: str
    method: str
    payload_size: float
    response_time: float
    status_code: int

class LogEventResponse(BaseModel):
    id: int
    timestamp: datetime
    source_ip: str
    endpoint: str
    method: str
    payload_size: float
    response_time: float
    status_code: int
    is_anomaly: bool
    anomaly_score: float
    threat_level: str
    pattern_match: Optional[str] = None

    class Config:
        orm_mode = True

class ThreatStatsResponse(BaseModel):
    total_events: int
    normal_count: int
    suspicious_count: int
    high_risk_count: int
    recent_anomalies: list[LogEventResponse]
