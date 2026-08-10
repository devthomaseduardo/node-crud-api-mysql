# Frontend Vite - Node CRUD API MySQL

Frontend moderno (Vite + React + TypeScript) para o CRUD de usuarios.

## Rodar local

```bash
cd frontend-vite
npm install
cp .env.example .env
# edite VITE_API_URL se a API nao estiver em localhost:8800
npm run dev
```

## Deploy na Vercel

1. Importe o repositorio na Vercel
2. Root Directory: `frontend-vite`
3. Framework: Vite
4. Variavel de ambiente: `VITE_API_URL` = URL publica da sua API (ex: https://sua-api.railway.app/api)

**Importante:** a API Node precisa estar hospedada (Railway, Render, Fly.io etc.) com MySQL acessivel. A Vercel so roda o frontend estatico.
