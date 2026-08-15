def assess_threat_level(anomaly_score: float, pattern_match: str | None) -> str:
    """
    ML-Based Decision Engine
    Combines anomaly score and similarity score (pattern_match) to determine threat level.
    """
    if pattern_match is not None:
        # If it matches a known attack pattern, it's immediately high risk
        return "High-Risk"
        
    if anomaly_score >= 0.8:
        return "High-Risk"
    elif anomaly_score >= 0.5:
        return "Suspicious"
    else:
        return "Normal"
