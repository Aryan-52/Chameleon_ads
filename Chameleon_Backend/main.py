from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import time
import json
import logging
from datetime import datetime

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS so frontend can call it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or list your frontend origin(s) explicitly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your trained model
model = joblib.load("model/model.pkl")

def get_client_ip(request: Request) -> str:
    xff = request.headers.get("X-Forwarded-For") or request.headers.get("X-Forwarded-For")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host

@app.post("/analyze-input")
async def analyze(request: Request):
    data = await request.json()
    payload = data.get("payload", "")
    client_ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent", "unknown")

    # Tar-pit delay
    time.sleep(2)

    # Prediction
    pred = model.predict([payload])[0]
    try:
        prob = float(max(model.predict_proba([payload])[0]))
    except Exception:
        prob = None

    logger.info(f"IP={client_ip} | UA={user_agent} | Payload={payload} | Predicted={pred} | Prob={prob}")

    lbl = str(pred).lower()
    if lbl in ["sqli", "sql_injection", "1"]:
        response = {"error": "Error 1064 (42000): You have an error in your SQL syntax near '" + payload[:20] + "...'"}
        attack_type = "SQLi"
    elif lbl in ["xss", "cross_site_scripting"]:
        response = {"error": "500 Internal Server Error: Unexpected token '<script>' in JSON"}
        attack_type = "XSS"
    else:
        response = {"result": "Query executed successfully"}
        attack_type = "Benign"

    entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "ip": client_ip,
        "user_agent": user_agent,
        "payload": payload,
        "label": str(pred),
        "probability": prob,
        "attack_type": attack_type
    }
    with open("logs.json", "a") as f:
        f.write(json.dumps(entry) + "\n")

    return response

@app.get("/logs")
async def get_logs():
    entries = []
    try:
        with open("logs.json", "r") as f:
            for line in f:
                entries.append(json.loads(line))
    except FileNotFoundError:
        logger.warning("logs.json file not found")
    entries.reverse()
    return entries

@app.get("/metrics")
async def get_metrics():
    # Example placeholder for metrics
    # Could load logs, compute counts, unique IPs, etc
    entries = []
    try:
        with open("logs.json", "r") as f:
            for line in f:
                entries.append(json.loads(line))
    except FileNotFoundError:
        logger.warning("logs.json file not found")
    total = len(entries)
    unique_ips = len({e["ip"] for e in entries})
    return {
        "total_events": total,
        "unique_ips": unique_ips
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4000)
