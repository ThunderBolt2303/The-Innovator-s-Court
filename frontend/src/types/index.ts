export interface LogEvent {
    id: number;
    timestamp: string;
    source_ip: string;
    endpoint: string;
    method: string;
    payload_size: number;
    response_time: number;
    status_code: number;
    is_anomaly: boolean;
    anomaly_score: number;
    threat_level: "Normal" | "Suspicious" | "High-Risk";
    pattern_match: string | null;
}

export interface ThreatStats {
    total_events: number;
    normal_count: number;
    suspicious_count: number;
    high_risk_count: number;
    recent_anomalies: LogEvent[];
}
