# Node CRUD API + MySQL

API REST completa de **usuários** com operações CRUD (Create, Read, Update, Delete), construída com **Node.js**, **Express** e **MySQL**.

Inclui frontend de demonstração (React/Vite).

**Autor:** [Thomas Eduardo](https://thomaseduardo.com.br)  
**Repositório:** [github.com/devthomaseduardo/node-crud-api-mysql](https://github.com/devthomaseduardo/node-crud-api-mysql)

---

## Propósito

- Exercitar CRUD REST e MySQL2 com connection pool
- Separar config, rotas e controllers
- Demonstrar estrutura limpa de API + frontend

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/usuarios` | Criar usuário |
| `GET` | `/api/usuarios` | Listar usuários |
| `GET` | `/api/usuarios/:id` | Buscar por ID |
| `PUT` | `/api/usuarios/:id` | Atualizar |
| `DELETE` | `/api/usuarios/:id` | Remover |

---

## Quick Start

### Pré-requisitos

- Node.js 18+
- MySQL com database `nodemysql` e tabela `usuarios`

```sql
CREATE DATABASE nodemysql;

USE nodemysql;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Instalação

```bash
git clone https://github.com/devthomaseduardo/node-crud-api-mysql.git
cd node-crud-api-mysql
npm install
```

Crie `.env` na pasta da API:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=nodemysql
PORT=3000
```

```bash
npm run dev
```

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Runtime | Node.js 18+ |
| Framework | Express |
| Banco | MySQL (mysql2 + pool) |
| Frontend | React (Vite) — pastas `frontend` / `frontend-vite` |
| Config | dotenv, cors, body-parser |

---

## Estrutura

```text
api/
  controllers/
  routes/
  db.js
  index.js
frontend/          # demo React
frontend-vite/     # alternativa Vite
```

---

## Licença

MIT © Thomas Eduardo
