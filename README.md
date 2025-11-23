# API-ATT — API de Livros (CRUD)

API completa para gerenciar livros usando **Node.js + Express**, **Supabase** (autenticação e banco de dados) e **Docker** para deploy no **Render**.

## ✅ Requisitos Atendidos

- ✅ CRUD completo (listar, buscar, criar, atualizar, excluir)
- ✅ Organização de pastas e código limpo (controllers, routes, validators, middlewares)
- ✅ Validações com Zod e tratamento de erros
- ✅ Retornos JSON com códigos HTTP corretos (200, 201, 204, 400, 401, 403, 404, 500)
- ✅ Autenticação e banco de dados com Supabase
- ✅ Deploy online no Render: **https://api-att-1.onrender.com**
- ✅ Repositório GitHub: https://github.com/OFSETE/API-ATT (branch OFFSET-ENTERPRISE)
- ✅ Testes unitários com Jest

## 📌 Endpoints Principais

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/` | Health check | Não |
| GET | `/books` | Lista todos os livros | Não |
| GET | `/books/:id` | Busca livro por ID | Não |
| POST | `/books` | Cria um novo livro | **Sim** |
| PUT | `/books/:id` | Atualiza um livro | **Sim** (owner) |
| DELETE | `/books/:id` | Remove um livro | **Sim** (owner) |

## 📋 Exemplo de Payload (POST/PUT)

```json
{
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "published_year": 1954,
  "genre": "Fantasia"
}
```

## 🧪 Exemplos de Teste (curl)

### 1) Health Check
```bash
curl -s https://api-att-1.onrender.com/ | jq
# Resposta: { "ok": true, "message": "API Supabase Posts" }
```

### 2) Listar Livros (público)
```bash
curl -s https://api-att-1.onrender.com/books | jq
# Resposta: [] (array vazio ou com livros)
```

### 3) Buscar Livro por ID
```bash
curl -s https://api-att-1.onrender.com/books/<ID> | jq
```

### 4) Criar Livro (autenticado)
Primeiro, obtenha um `access_token` do Supabase:
```bash
curl -X POST "https://ikyxngzoaashxquzijyp.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: <ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"senha"}'
```

Depois, crie o livro:
```bash
curl -X POST https://api-att-1.onrender.com/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{"title":"Livro X","author":"Autor Y","published_year":2020,"genre":"Ficção"}'
```

### 5) Atualizar Livro (autenticado, apenas owner)
```bash
curl -X PUT https://api-att-1.onrender.com/books/<ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{"title":"Novo Título"}'
```

### 6) Deletar Livro (autenticado, apenas owner)
```bash
curl -X DELETE https://api-att-1.onrender.com/books/<ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
# Resposta: 204 (sem body)
```

## ⚙️ Configuração e Setup

### Variáveis de Ambiente

```
SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
PORT=3000
```

### Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/OFSETE/API-ATT.git
cd API-ATT
```

2. Instale dependências:
```bash
npm install
```

3. Configure `.env` (copie `.env.example`):
```bash
cp .env.example .env
# Edite .env com suas credenciais do Supabase
```

4. Crie a tabela `books` no Supabase:
   - Abra o SQL Editor do seu projeto Supabase
   - Cole e execute o conteúdo de `db/migrations/create_books_table.sql`

5. Inicie o servidor:
```bash
npm run dev    # com nodemon (desenvolvimento)
# ou
npm start      # produção
```

A API estará disponível em `http://localhost:3000`

### Rodar Testes

```bash
npm test
```

## 🚀 Deploy no Render

A API já está publicada em: **https://api-att-1.onrender.com**

### Passos para Deploy (se precisar redeployar)

1. **Conecte o repositório GitHub** no Render:
   - Dashboard Render → New → Web Service
   - Connect GitHub → selecione `OFSETE/API-ATT`
   - Branch: `OFFSET-ENTERPRISE`

2. **Configure Environment**:
   - Environment: `Docker` (Render detectará o `Dockerfile`)
   - Adicione variáveis (Environment → Environment Variables):
     - `SUPABASE_URL` = https://seu-projeto.supabase.co
     - `SUPABASE_SERVICE_ROLE_KEY` = <service_role_key>

3. **Deploy**:
   - Clique em "Create Web Service"
   - Acompanhe os logs
   - Após sucesso, a URL pública será exibida

## 📚 Estrutura do Projeto

```
/
├── src/
│   ├── app.js                    # Express app
│   ├── server.js                 # Start server
│   ├── supabaseClient.js         # Supabase client
│   ├── controllers/
│   │   ├── books.js              # CRUD logic
│   │   └── posts.js              # (referência)
│   ├── routes/
│   │   ├── books.js              # Books routes
│   │   └── posts.js              # (referência)
│   ├── validators/
│   │   ├── bookValidator.js      # Zod schema
│   │   └── postValidator.js      # (referência)
│   └── middlewares/
│       ├── auth.js               # JWT authentication
│       └── errorHandler.js       # Error handling
├── db/
│   └── migrations/
│       └── create_books_table.sql # Database schema
├── tests/
│   ├── books.test.js             # Unit tests
│   └── posts.test.js             # (referência)
├── Dockerfile                     # Docker config (Node 20)
├── render.yaml                    # Render deploy config
├── jest.config.js                # Jest config
├── .env.example                  # Example environment
├── .gitignore                    # Git ignore (covers .env)
└── README.md                     # This file
```

## 🔐 Segurança

- ✅ Variáveis sensíveis armazenadas em `.env` (não commitadas)
- ✅ Autenticação com JWT via Supabase Auth
- ✅ Row Level Security (RLS) configurável no Supabase
- ✅ Validação de entrada com Zod
- ✅ Tratamento de erro padronizado
- ✅ Service Role Key mantida apenas no servidor (variáveis de ambiente)

## 📝 Notas

- A tabela `books` deve ser criada no Supabase antes de usar a API (veja `db/migrations/create_books_table.sql`)
- Tokens de autenticação devem ser obtidos via Supabase Auth (endpoints `/auth/v1/...`)
- Apenas o owner de um livro (quem o criou) pode atualizar ou deletá-lo
- Respostas 401 indicam token inválido/expirado; 403 indica falta de permissão

## 📞 Links Importantes

- 🔗 **API Online**: https://api-att-1.onrender.com
- 🔗 **Repositório GitHub**: https://github.com/OFSETE/API-ATT
- 🔗 **Branch de Entrega**: `OFFSET-ENTERPRISE`
- 🔗 **Referência (projeto semelhante)**: https://github.com/spaaws/news

---

**Desenvolvido com Node.js + Express + Supabase + Docker**

