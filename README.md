# Node CRUD API + MySQL + React

API REST de usuários (CRUD) com **Node.js**, **Express** e **MySQL**. Base de estudo e demonstração de boas práticas backend.

> Autor: [Thomas Eduardo](https://thomaseduardo.com.br)  
> Repositório sugerido (renomear no GitHub): `node-crud-api-mysql`

---

## Stack

- Node.js · Express · MySQL2 · dotenv · CORS

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/usuarios` | Criar usuário |
| `GET` | `/api/usuarios` | Listar |
| `GET` | `/api/usuarios/:id` | Buscar por ID |
| `PUT` | `/api/usuarios/:id` | Atualizar |
| `DELETE` | `/api/usuarios/:id` | Remover |

## Setup

```bash
git clone https://github.com/devthomaseduardo/NodeCrude-Api-Mysql-React.git
cd NodeCrude-Api-Mysql-React
npm install
```

MySQL:

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

`.env`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nodemysql
PORT=8800
```

```bash
npm run dev   # ou npm start
```

## Licença

MIT © Thomas Eduardo
