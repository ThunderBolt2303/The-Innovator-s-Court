import numpy as np
from sklearn.ensemble import IsolationForest
import pandas as pd

class MLPipeline:
    def __init__(self):
        # In a real scenario, this would be pre-trained and loaded via joblib
        # For the prototype, we initialize an IsolationForest
        self.iso_forest = IsolationForest(contamination=0.05, random_state=42)
        self.is_trained = False
        
        # Centroids for pattern recognition (mocking historical attack clusters)
        # Features: [payload_size_scaled, response_time_scaled]
        self.attack_centroids = {
            "SQLi": np.array([2.5, 1.2]),
            "DDoS": np.array([0.1, 5.0]),
            "BruteForce": np.array([0.5, 0.5]) # many small requests
        }

    def _extract_features(self, data: dict):
        # Simplified feature extraction for the prototype
        # Real system would encode method, endpoint, etc.
        return np.array([[data['payload_size'], data['response_time']]])

    def train_initial_model(self, initial_data: list[dict]):
        if not initial_data:
            return
        
        df = pd.DataFrame(initial_data)
        X = df[['payload_size', 'response_time']].values
        self.iso_forest.fit(X)
        self.is_trained = True

    def analyze_request(self, data: dict) -> dict:
        features = self._extract_features(data)
        
        # 1. Anomaly Detection (Isolation Forest)
        if not self.is_trained:
            # Fallback if not trained
            anomaly_score = 0.5
            is_anomaly = False
        else:
            # score_samples returns negative scores (lower is more anomalous)
            # Normalize to 0-1 (higher is more anomalous)
            raw_score = self.iso_forest.score_samples(features)[0]
            # typical scores are between -1 and 0. 
            anomaly_score = max(0, min(1, abs(raw_score))) 
            
            prediction = self.iso_forest.predict(features)[0]
            is_anomaly = prediction == -1
            
        # 2. Centroid-based Pattern Recognition
        pattern_match = None
        min_distance = float('inf')
        
        # For matching, we would scale features, but let's do a simple distance here
        scaled_features = np.array([data['payload_size'] / 1000, data['response_time'] / 100]) # crude scaling
        
        for attack_type, centroid in self.attack_centroids.items():
            distance = np.linalg.norm(scaled_features - centroid)
            if distance < 1.0: # threshold for matching
                if distance < min_distance:
                    min_distance = distance
                    pattern_match = attack_type
                    
        return {
            "is_anomaly": is_anomaly,
            "anomaly_score": round(anomaly_score, 2),
            "pattern_match": pattern_match
        }

ml_pipeline = MLPipeline()
