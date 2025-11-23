# Chameleon Honeypot 🐍

**Chameleon Honeypot** is an adaptive deception platform designed to trap malicious actors by presenting a realistic yet fake data-bank interface.  
While attackers think they’re breaching sensitive systems, they are actually interacting with our honeypot, enabling you to monitor, analyse and respond to their behavior.

---

## 🔍 Features
- Front-end "Online Data Bank" UI with fake login (Admin + Normal User flows)  
- Fake “Vault” page that appears vulnerable, triggering traps for attackers  
- Backend ML-powered classification to detect types of payloads (SQL Injection, XSS, etc)  
- Tar-pitting delays & fake error responses to mislead attackers  
- Real-time logging of attacker payloads (IP, timestamp, attack type, probability)  
- Admin dashboard providing metrics, recent events, export as PDF  
- Modular — easy to extend with new deception logic or attack types  

---

## 📦 Tech Stack
- **Frontend**: React + Vite + React Router  
- **Backend**: FastAPI (Python) + joblib (ML model)  
- **ML Model**: TF-IDF + scikit-learn (trained on Kaggle datasets)  
- **Data Storage**: Flat JSON logs for simplicity  
- **Utilities**: jsPDF for PDF export, live refresh interval for admin logs  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm / yarn  
- Python 3.9+ with pip  
- (Optional) Virtual environment for Python  

### Installation

#### Frontend
```bash
cd frontend  
npm install  
npm run dev
