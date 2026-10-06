### AI Implementation Bot Web App

Questo progetto è un esempio di **bot AI integrato in un’app web**, sviluppato con **React, Axios, Python (FastAPI)** e un modello pubblico di Hugging Face (**PublicAI**).  
Il bot simula un agente di supporto virtuale, con chat in tempo reale tra frontend e backend.

---

## Funzionalità

- Inviare richieste testuali al bot AI
- Ricevere risposte in tempo reale
- Interfaccia semplice con React
- Backend gestito con FastAPI
- Utilizzo di modelli pubblici di Hugging Face

---

## Installazione

### 1. Clona il repository

```bash
git clone https://github.com/TUO-USERNAME/NOME-REPO.git

cd NOME-REPO
```
### 2. Backend (Python / FastAPI)
Crea un ambiente virtuale:
```
python -m venv venv

source venv/bin/activate   # Linux / Mac

venv\Scripts\activate      # Windows
```
Installa le dipendenze:
```
pip install -r requirements.txt
```
Crea un file .env nella cartella back-end con i seguenti valori:
```
HF_TOKEN='INSERISCI_IL_TUO_TOKEN_HUGGINGFACE'

DOMAIN='INSERISCI_IL_TUO_DOMAIN_BACKEND'
```
Nota: sostituisci HF_TOKEN con il tuo token Hugging Face e DOMAIN con il tuo dominio o localhost, dove gira il backend.

Avvia il server FastAPI:
```
uvicorn main:app --reload
```
### 3. Frontend (React)
Spostati nella cartella frontend:
```
cd front-end
```
Installa le dipendenze:
```
npm install
```
Configura il dominio del backend se necessario (nell’API call con Axios):
```
const response = await axios.post("IL_TUO_DOMAIN_BACKEND/chatBot/userRequest", {
  richiesta: richiesta_utente,
});
```
Avvia il frontend:
```
npm start
```

### - Uso
Apri la chat sul frontend.

Digita un messaggio.

Il backend invierà la richiesta al modello PublicAI.

Visualizza la risposta del bot nella chat in tempo reale.


### - Risorse utili
Hugging Face Inference API ( https://huggingface.co/docs/inference-providers/providers/publicai )

FastAPI Documentation ( https://fastapi.tiangolo.com/tutorial/metadata/ )

Axios Documentation ( https://axios-http.com/docs/intro )


### - Contributi
Questo progetto è a scopo istruttivo. Miglioramenti possibili:

 - Storico delle conversazioni

 - Autenticazione utenti

 - UI più avanzata

 - Deploy in produzione

