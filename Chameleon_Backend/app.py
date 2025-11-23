import os
import glob
import json
import joblib
from flask import Flask, request, jsonify


# =====================================================
#  AUTO-DETECT MODEL, VECTORIZER, LEX FILES
# =====================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

def auto_pick_file(preferred_list, glob_pattern):
    """Return first existing file, else glob match, else None."""
    for p in preferred_list:
        if os.path.exists(p):
            return p
    matches = glob.glob(glob_pattern)
    return matches[0] if matches else None


# MODEL
MODEL_FILE = auto_pick_file(
    preferred_list=[
        os.path.join(MODEL_DIR, "model_featureunion_converged.pkl"),
        os.path.join(MODEL_DIR, "model_featureunion_maxiter10000.pkl"),
        os.path.join(MODEL_DIR, "model_featureunion.pkl"),
        os.path.join(MODEL_DIR, "model.pkl")
    ],
    glob_pattern=os.path.join(MODEL_DIR, "model*.pkl")
)

# VECTORIZER
VECT_FILE = auto_pick_file(
    preferred_list=[
        os.path.join(MODEL_DIR, "vectorizer_maxiter10000.pkl"),
        os.path.join(MODEL_DIR, "vectorizer.pkl")
    ],
    glob_pattern=os.path.join(MODEL_DIR, "vectorizer*.pkl")
)

# LEXICAL
LEX_FILE = auto_pick_file(
    preferred_list=[
        os.path.join(MODEL_DIR, "lex_features.json"),
        os.path.join(MODEL_DIR, "lex_features (1).json")
    ],
    glob_pattern=os.path.join(MODEL_DIR, "lex_features*.json")
)

# Validate files exist
if not MODEL_FILE or not VECT_FILE or not LEX_FILE:
    raise FileNotFoundError(
        f"❌ Missing required model files:\n"
        f"MODEL_FILE={MODEL_FILE}\n"
        f"VECT_FILE={VECT_FILE}\n"
        f"LEX_FILE={LEX_FILE}"
    )

print("✅ MODEL FILE:", MODEL_FILE)
print("✅ VECTOR:", VECT_FILE)
print("✅ LEX:", LEX_FILE)

# =====================================================
#  LOAD MODEL & VECTORIZER
# =====================================================

model = joblib.load(MODEL_FILE)
vectorizer = joblib.load(VECT_FILE)

with open(LEX_FILE, "r") as f:
    lex_config = json.load(f)


# LABEL MAPS
LABEL_MAP = {0: "benign", 1: "sqli", 2: "xss"}
DECEPTION = {
    0: "Authenticate: success",
    1: "Error 101: SQL syntax error near input",
    2: "Frontend Rendering Error: Unexpected token '<' in HTML template"
}

# =====================================================
#  FLASK API
# =====================================================

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "ok", "msg": "Chameleon backend running"}), 200


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    if not data or "input" not in data:
        return jsonify({"error": "Missing input"}), 400

    text = data["input"]

    X = vectorizer.transform([text])
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0][pred]

    return jsonify({
        "input": text,
        "label_id": int(pred),
        "label": LABEL_MAP[pred],
        "confidence": float(prob),
        "deception_output": DECEPTION[pred]
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
