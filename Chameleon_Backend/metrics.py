# metrics.py
import json
from collections import Counter

LOG_FILE = "logs.json"

def load_entries():
    entries = []
    try:
        with open(LOG_FILE, "r") as f:
            for line in f:
                entries.append(json.loads(line))
    except:
        pass
    return entries

def summary_metrics():
    entries = load_entries()
    total = len(entries)
    unique_ips = len(set(e["ip"] for e in entries))
    attacks = [e["attack_type"] for e in entries if e["attack_type"] != "Benign"]
    top_types = Counter(attacks).most_common(3)
    return {
        "total_events": total,
        "unique_ips": unique_ips,
        "top_attack_types": top_types
    }
