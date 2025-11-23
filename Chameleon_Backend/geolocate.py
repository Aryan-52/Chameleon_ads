# geolocate.py
import requests

def geolocate_ip(ip):
    try:
        resp = requests.get(f"https://ipinfo.io/{ip}/json")
        if resp.status_code == 200:
            data = resp.json()
            return {
                "country": data.get("country"),
                "region": data.get("region"),
                "city": data.get("city"),
                "org": data.get("org")
            }
        else:
            return {}
    except Exception:
        return {}
