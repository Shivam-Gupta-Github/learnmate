# LearnMate - AI Learning Companion

**LearnMate** is an AI-powered learning assistant that extracts information from PDFs and YouTube transcripts and provides structured notes, summaries, and Q\&A using a multi-agent RAG system.

---

## Project Structure

```bash
learnmate/
│
├── backend/ # Node.js + Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── files/      # store PDFs or uploaded files
│   ├── chroma_db/  # local Chroma DB storage
│   ├── package.json
│   └── .env
│
├── frontend/ # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── .env
│
└── .gitignore
```

---

## Prerequisites

- Node.js \>= 22
- npm
- OpenAI API Key (Free tier or Paid for larger usage)
- Python (if you want to use local PDF parsing with some libraries)
- ChromaDB CLI (`npm install -g chromadb`)

---

## Backend Setup

1.  **Install dependencies**

    ```bash
    cd backend
    npm install
    ```

2.  **Set environment variables in `backend/.env`**

    ```env
    OPENAI_API_KEY=your_openai_api_key
    CHROMA_DB_DIR=./chroma_db
    PORT=5000
    ```

3.  **Start Chroma server**

    ```bash
    cd backend
    chroma run --path ./chroma_db
    ```

4.  **Run backend server**

    ```bash
    cd backend
    node src/server.js
    ```

    Your backend API should now be running on `http://localhost:5000`.

## Frontend Setup

1.  **Install dependencies**

    ```bash
    cd frontend
    npm install
    ```

2.  **Run frontend**

    ```bash
    cd frontend
    npm run dev
    ```

    Open your browser at `http://localhost:5173` (or the URL printed in the terminal).

## Testing APIs

1.  **Ingest PDF**

    ```http
    POST http://localhost:5000/ingest
    Content-Type: application/json

    {
      "type": "pdf",
      "filePath": "C:/Users/shiva/projects/learnmate/backend/files/resume.pdf",
      "collection": "myPdfCollection"
    }
    ```

2.  **Ask a Question (Query)**

    ```http
    POST http://localhost:5000/query
    Content-Type: application/json

    {
      "query": "What are Shivam's achievements?",
      "collection": "myPdfCollection"
    }
    ```

    The response will be the clean AI answer.

## Notes

- Local Chroma DB is stored in `backend/chroma_db/`.
- Ignore sensitive files using `.gitignore`:
  ```gitignore
  **/.env
  **/node_modules/
  **/chroma_db/
  ```

## Features

- Parse PDF and YouTube transcripts
- Generate structured notes
- Summarize content
- Answer queries using RAG
- Generate quizzes
