# backend/main.py
from fastapi import FastAPI

app = FastAPI(title="Projeto Cronos API")

@app.get("/api/health")
def read_root():
    """Verifica a saúde da aplicação."""
    return {"status": "ok"}