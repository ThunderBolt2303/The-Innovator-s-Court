import random
from typing import List, Dict

def generate_initial_training_data(num_samples: int = 1000) -> List[Dict]:
    """Generates synthetic normal data to train the Isolation Forest initially."""
    data = []
    for _ in range(num_samples):
        data.append({
            "payload_size": random.uniform(0.1, 2.0), # typical small payloads
            "response_time": random.uniform(0.05, 0.5) # fast responses
        })
    return data

def generate_live_synthetic_data() -> Dict:
    """Generates a synthetic incoming request, sometimes anomalous."""
    is_attack = random.random() < 0.15 # 15% chance of attack
    
    if is_attack:
        attack_type = random.choice(["SQLi", "DDoS", "BruteForce", "UnknownAnomaly"])
        if attack_type == "SQLi":
            return {
                "source_ip": f"192.168.1.{random.randint(100, 255)}",
                "endpoint": "/api/login",
                "method": "POST",
                "payload_size": random.uniform(2.0, 5.0), # larger payloads for injection
                "response_time": random.uniform(0.8, 2.0), # slower response due to DB strain
                "status_code": 500
            }
        elif attack_type == "DDoS":
            return {
                "source_ip": f"10.0.0.{random.randint(1, 255)}",
                "endpoint": "/",
                "method": "GET",
                "payload_size": random.uniform(0.01, 0.1),
                "response_time": random.uniform(2.0, 10.0), # very slow due to load
                "status_code": 503
            }
        elif attack_type == "BruteForce":
            return {
                "source_ip": f"172.16.0.{random.randint(1, 255)}",
                "endpoint": "/auth/token",
                "method": "POST",
                "payload_size": random.uniform(0.1, 0.3),
                "response_time": random.uniform(0.1, 0.4),
                "status_code": 401
            }
        else: # Unknown Anomaly (new 0-day)
            return {
                "source_ip": "11.22.33.44",
                "endpoint": "/api/admin/config",
                "method": "PUT",
                "payload_size": random.uniform(10.0, 20.0), # massive payload
                "response_time": random.uniform(0.01, 0.05), # oddly fast
                "status_code": 200
            }
    else:
        # Normal traffic
        return {
            "source_ip": f"192.168.1.{random.randint(1, 50)}",
            "endpoint": random.choice(["/home", "/api/users", "/api/products"]),
            "method": "GET",
            "payload_size": random.uniform(0.1, 1.5),
            "response_time": random.uniform(0.05, 0.4),
            "status_code": 200
        }
