# alerts.py
import smtplib
from email.message import EmailMessage

ADMIN_EMAIL = "admin@yourdomain.com"
SMTP_SERVER = "smtp.yourprovider.com"
SMTP_PORT = 587
SMTP_USER = "smtp_user"
SMTP_PASS = "smtp_pass"

def send_alert(entry):
    msg = EmailMessage()
    msg["Subject"] = f"High-Risk Honeypot Alert: {entry['attack_type']}"
    msg["From"] = SMTP_USER
    msg["To"] = ADMIN_EMAIL
    body = f"""
High-Risk event detected:

Timestamp : {entry['timestamp']}
IP        : {entry['ip']}
Type      : {entry['attack_type']}
Payload   : {entry['payload']}
Probability: {entry['probability']}
Geo       : {entry.get('geo')}
UserAgent : {entry.get('user_agent')}
    """
    msg.set_content(body)
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as s:
        s.starttls()
        s.login(SMTP_USER, SMTP_PASS)
        s.send_message(msg)
