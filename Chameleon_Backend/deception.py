import random
from collections import defaultdict
import time

request_counter = defaultdict(int)

def generate_fake_error(label, payload):
    if label == "SQLI":
        errors = [
            f"SQL Error 1064: Syntax error near '{payload[:10]}'",
            "Database connection reset unexpectedly",
            "PDOException: invalid SQL syntax"
        ]
        return random.choice(errors)

    elif label == "XSS":
        errors = [
            "Warning: Unsafe script blocked",
            "DOMException: script injection prevented",
            "CSP Error: Inline script violation"
        ]
        return random.choice(errors)

    else:
        return "Input processed successfully"


def apply_tarpit(ip):
    request_counter[ip] += 1

    if request_counter[ip] > 10:
        return random.uniform(1.0, 3.0)  # heavy slowdown
    elif request_counter[ip] > 5:
        return random.uniform(0.3, 0.7)
    else:
        return 0
