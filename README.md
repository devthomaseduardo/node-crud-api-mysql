# Node CRUD API + MySQL

API REST de usuários (CRUD) com **Node.js**, **Express** e **MySQL**. Estudo de backend com rotas, controller e pool de conexões.

Autor: [Thomas Eduardo](https://thomaseduardo.com.br) · [GitHub](https://github.com/devthomaseduardo/NodeCrude-Api-Mysql-React)

> Nome sugerido no GitHub: `node-crud-api-mysql`

## Propósito

- Exercitar CRUD REST e MySQL2.
- Separar config, rotas e controllers.

## Funcionalidades

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/usuarios` | Criar |
| `GET` | `/api/usuarios` | Listar |
| `GET` | `/api/usuarios/:id` | Buscar |
| `PUT` | `/api/usuarios/:id` | Atualizar |
| `DELETE` | `/api/usuarios/:id` | Remover |

## Stack

| Camada | Tecnologia |
|--------|------------|
| Runtime | **Node.js** |
| Framework | **Express** |
| Banco | **MySQL** (mysql2) |

## Requisitos

- Node.js 18+
- MySQL com database `nodemysql` e tabela `usuarios`

## Instalação

```bash
git clone https://github.com/devthomaseduardo/NodeCrude-Api-Mysql-React.git
cd NodeCrude-Api-Mysql-React
npm install
```

`.env`: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT`.

```bash
npm run dev
```

## Licença

MIT © Thomas Eduardo
