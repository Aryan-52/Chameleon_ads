import json
import hashlib
import time

def log_event(payload, ip, label, confidence, fake_error, delay):
    timestamp = int(time.time())

    log_entry = {
        "timestamp": timestamp,
        "input": payload,
        "ip": ip,
        "label": label,
        "confidence": confidence,
        "fake_error": fake_error,
        "delay": delay,
        "hash": hashlib.sha256(payload.encode()).hexdigest()
    }

    with open("logs/events.jsonl", "a") as f:
        f.write(json.dumps(log_entry) + "\n")
