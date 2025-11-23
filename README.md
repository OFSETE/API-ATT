# 📚 API-ATT — API de Livros# 📚 API-ATT — API de Livros



API CRUD de livros desenvolvida com **Node.js**, **Express**, **Supabase** e **Docker**.API CRUD de livros desenvolvida com **Node.js**, **Express**, **Supabase** e **Docker**.



**🔗 API Online:** https://api-att-1.onrender.com  **🔗 API Online:** https://api-att-1.onrender.com  

**📂 Repositório:** https://github.com/OFSETE/API-ATT (branch: OFFSET-ENTERPRISE)**📂 Repositório:** https://github.com/OFSETE/API-ATT (branch: OFFSET-ENTERPRISE)



---## 📋 Exemplo de Payload (POST/PUT)



## 🚀 Como Rodar o Projeto Localmente```json

{

### Pré-requisitos  "title": "O Senhor dos Anéis",

  "author": "J.R.R. Tolkien",

- **Node.js** v20+ (recomendado)  "published_year": 1954,

- **npm** ou **yarn**  "genre": "Fantasia"

- **Conta Supabase** com projeto criado}

- **Git**```



### Passo a Passo## 🧪 Exemplos de Teste (curl)



1. **Clone o repositório:**### 1) Health Check

```bash

   ```bashcurl -s https://api-att-1.onrender.com/ | jq

   git clone https://github.com/OFSETE/API-ATT.git# Resposta: { "ok": true, "message": "API Supabase Posts" }

   cd API-ATT```

   git checkout OFFSET-ENTERPRISE

   ```### 2) Listar Livros (público)

```bash

2. **Instale as dependências:**curl -s https://api-att-1.onrender.com/books | jq

# Resposta: [] (array vazio ou com livros)

   ```bash```

   npm install

   ```### 3) Buscar Livro por ID

```bash

3. **Configure as variáveis de ambiente:**curl -s https://api-att-1.onrender.com/books/<ID> | jq

```

   Copie `.env.example` para `.env`:

### 4) Criar Livro (autenticado)

   ```bashPrimeiro, obtenha um `access_token` do Supabase:

   cp .env.example .env```bash

   ```curl -X POST "https://ikyxngzoaashxquzijyp.supabase.co/auth/v1/token?grant_type=password" \

  -H "apikey: <ANON_KEY>" \

   Edite `.env` com suas credenciais do Supabase:  -H "Content-Type: application/json" \

  -d '{"email":"usuario@example.com","password":"senha"}'

   ```env```

   SUPABASE_URL=https://seu-projeto.supabase.co

   SUPABASE_SERVICE_ROLE_KEY=sua-chave-secreta-aquiDepois, crie o livro:

   PORT=3000```bash

   ```curl -X POST https://api-att-1.onrender.com/books \

  -H "Content-Type: application/json" \

   ⚠️ **IMPORTANTE:** `SUPABASE_URL` deve ser a URL do seu projeto (`https://...`), **não** a string de conexão PostgreSQL.  -H "Authorization: Bearer <ACCESS_TOKEN>" \

  -d '{"title":"Livro X","author":"Autor Y","published_year":2020,"genre":"Ficção"}'

4. **Crie a tabela no Supabase:**```



   Acesse o painel **SQL Editor** do Supabase e execute:### 5) Atualizar Livro (autenticado, apenas owner)

```bash

   ```sqlcurl -X PUT https://api-att-1.onrender.com/books/<ID> \

   CREATE TABLE IF NOT EXISTS books (  -H "Content-Type: application/json" \

     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,  -H "Authorization: Bearer <ACCESS_TOKEN>" \

     title VARCHAR(255) NOT NULL,  -d '{"title":"Novo Título"}'

     author VARCHAR(255) NOT NULL,```

     published_year INTEGER,

     genre VARCHAR(100),### 6) Deletar Livro (autenticado, apenas owner)

     owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,```bash

     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()curl -X DELETE https://api-att-1.onrender.com/books/<ID> \

   );  -H "Authorization: Bearer <ACCESS_TOKEN>"

# Resposta: 204 (sem body)

   CREATE INDEX idx_books_owner_id ON books(owner_id);```

   ```

## ⚙️ Configuração e Setup

5. **Inicie o servidor em desenvolvimento:**

### Variáveis de Ambiente

   ```bash

   npm run dev```

   ```SUPABASE_URL=https://<seu-projeto>.supabase.co

SUPABASE_SERVICE_ROLE_KEY=<service_role_key>

   ✅ API rodando em: `http://localhost:3000`PORT=3000

```

6. **Rodar testes:**

### Executar Localmente

   ```bash

   npm test1. Clone o repositório:

   ``````bash

git clone https://github.com/OFSETE/API-ATT.git

---cd API-ATT

```

## 🌐 Como Hospedar no Render

2. Instale dependências:

A API já está publicada online: **https://api-att-1.onrender.com** 🎉```bash

npm install

### Pré-requisitos```



- Conta no **Render** (https://render.com)3. Configure `.env` (copie `.env.example`):

- Projeto Supabase criado e tabela `books` criada```bash

- Repositório GitHub com código atualizadocp .env.example .env

# Edite .env com suas credenciais do Supabase

### Passo a Passo```



1. **Acesse Render Dashboard:**4. Crie a tabela `books` no Supabase:

   - Abra o SQL Editor do seu projeto Supabase

   - Faça login em https://dashboard.render.com   - Cole e execute o conteúdo de `db/migrations/create_books_table.sql`

   - Clique em **"New +"** → **"Web Service"**

5. Inicie o servidor:

2. **Conecte seu repositório GitHub:**```bash

npm run dev    # com nodemon (desenvolvimento)

   - Clique em **"Connect GitHub"**# ou

   - Autorize o Render a acessar seu perfilnpm start      # produção

   - Selecione o repositório `OFSETE/API-ATT````

   - Branch: `OFFSET-ENTERPRISE`

A API estará disponível em `http://localhost:3000`

3. **Configure o Serviço:**

### Rodar Testes

   - **Name:** `api-att` (ou outro nome desejado)

   - **Runtime:** `Docker````bash

   - **Region:** `Oregon` (ou próxima de você)npm test

   - **Branch:** `OFFSET-ENTERPRISE````



4. **Defina as Variáveis de Ambiente:**## 🚀 Deploy no Render



   - Clique em **"Advanced"** → **"Add Environment Variable"**A API já está publicada em: **https://api-att-1.onrender.com**

   - Adicione:

     - `SUPABASE_URL` = `https://seu-projeto.supabase.co`### Passos para Deploy (se precisar redeployar)

     - `SUPABASE_SERVICE_ROLE_KEY` = `sua-chave-service-role`

     - `PORT` = `3000`1. **Conecte o repositório GitHub** no Render:

   - Dashboard Render → New → Web Service

5. **Escolha o Plano:**   - Connect GitHub → selecione `OFSETE/API-ATT`

   - Branch: `OFFSET-ENTERPRISE`

   - **Free** (recomendado para desenvolvimento)

   - Clique em **"Create Web Service"**2. **Configure Environment**:

   - Environment: `Docker` (Render detectará o `Dockerfile`)

6. **Aguarde o Deploy:**   - Adicione variáveis (Environment → Environment Variables):

     - `SUPABASE_URL` = https://seu-projeto.supabase.co

   - Acompanhe os logs em tempo real     - `SUPABASE_SERVICE_ROLE_KEY` = <service_role_key>

   - Quando terminar, você terá uma URL pública (ex: `https://api-att-1.onrender.com`)

3. **Deploy**:

7. **Teste a API:**   - Clique em "Create Web Service"

   - Acompanhe os logs

   ```bash   - Após sucesso, a URL pública será exibida

   curl -s https://api-att-1.onrender.com/ | jq

   curl -s https://api-att-1.onrender.com/books | jq## 📚 Estrutura do Projeto

   ```

```

---/

├── src/

## 📌 Endpoints│   ├── app.js                    # Express app

│   ├── server.js                 # Start server

| Método | Rota | Descrição | Autenticação |│   ├── supabaseClient.js         # Supabase client

|--------|------|-----------|--------------|│   ├── controllers/

| GET | `/` | Health check | Não |│   │   ├── books.js              # CRUD logic

| GET | `/books` | Lista todos os livros | Não |│   │   └── posts.js              # (referência)

| GET | `/books/:id` | Busca livro por ID | Não |│   ├── routes/

| POST | `/books` | Cria um novo livro | **Sim** |│   │   ├── books.js              # Books routes

| PUT | `/books/:id` | Atualiza um livro | **Sim** (owner) |│   │   └── posts.js              # (referência)

| DELETE | `/books/:id` | Remove um livro | **Sim** (owner) |│   ├── validators/

│   │   ├── bookValidator.js      # Zod schema

---│   │   └── postValidator.js      # (referência)

│   └── middlewares/

## 📋 Exemplos de Requisição│       ├── auth.js               # JWT authentication

│       └── errorHandler.js       # Error handling

### Payload (POST/PUT)├── db/

│   └── migrations/

```json│       └── create_books_table.sql # Database schema

{├── tests/

  "title": "O Senhor dos Anéis",│   ├── books.test.js             # Unit tests

  "author": "J.R.R. Tolkien",│   └── posts.test.js             # (referência)

  "published_year": 1954,├── Dockerfile                     # Docker config (Node 20)

  "genre": "Fantasia"├── render.yaml                    # Render deploy config

}├── jest.config.js                # Jest config

```├── .env.example                  # Example environment

├── .gitignore                    # Git ignore (covers .env)

### 1) Health Check└── README.md                     # This file

```

```bash

curl -s https://api-att-1.onrender.com/ | jq## 🔐 Segurança

```

- ✅ Variáveis sensíveis armazenadas em `.env` (não commitadas)

**Resposta:**- ✅ Autenticação com JWT via Supabase Auth

```json- ✅ Row Level Security (RLS) configurável no Supabase

{- ✅ Validação de entrada com Zod

  "ok": true,- ✅ Tratamento de erro padronizado

  "message": "API Supabase Posts"- ✅ Service Role Key mantida apenas no servidor (variáveis de ambiente)

}

```## 📝 Notas



### 2) Listar Livros (Público)- A tabela `books` deve ser criada no Supabase antes de usar a API (veja `db/migrations/create_books_table.sql`)

- Tokens de autenticação devem ser obtidos via Supabase Auth (endpoints `/auth/v1/...`)

```bash- Apenas o owner de um livro (quem o criou) pode atualizar ou deletá-lo

curl -s https://api-att-1.onrender.com/books | jq- Respostas 401 indicam token inválido/expirado; 403 indica falta de permissão

```

## 📞 Links Importantes

**Resposta:**

```json- 🔗 **API Online**: https://api-att-1.onrender.com

[- 🔗 **Repositório GitHub**: https://github.com/OFSETE/API-ATT

  {- 🔗 **Branch de Entrega**: `OFFSET-ENTERPRISE`

    "id": "550e8400-e29b-41d4-a716-446655440000",- 🔗 **Referência (projeto semelhante)**: https://github.com/spaaws/news

    "title": "O Senhor dos Anéis",

    "author": "J.R.R. Tolkien",---

    "published_year": 1954,

    "genre": "Fantasia",**Desenvolvido com Node.js + Express + Supabase + Docker**

    "owner_id": "user-uuid-123",

    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### 3) Buscar Livro por ID

```bash
curl -s https://api-att-1.onrender.com/books/550e8400-e29b-41d4-a716-446655440000 | jq
```

### 4) Criar Livro (Autenticado)

Primeiro, obtenha um `access_token` do Supabase:

```bash
curl -X POST "https://seu-projeto.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: <ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "sua-senha"
  }' | jq '.access_token'
```

Depois, crie o livro:

```bash
curl -X POST https://api-att-1.onrender.com/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "title": "Novo Livro",
    "author": "Autor",
    "published_year": 2024,
    "genre": "Ficção"
  }' | jq
```

**Resposta (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Novo Livro",
  "author": "Autor",
  "published_year": 2024,
  "genre": "Ficção",
  "owner_id": "user-uuid-123",
  "created_at": "2024-01-15T10:35:00Z"
}
```

### 5) Atualizar Livro (Autenticado, Apenas Owner)

```bash
curl -X PUT https://api-att-1.onrender.com/books/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{"title": "Título Atualizado"}' | jq
```

### 6) Deletar Livro (Autenticado, Apenas Owner)

```bash
curl -X DELETE https://api-att-1.onrender.com/books/550e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

**Resposta:** `204 No Content` (sem body)

---

## 🔧 Solução de Problemas

### ❌ "Invalid SUPABASE_URL"

**Problema:** Deploy falha com erro de URL inválida.

**Solução:** Verifique se `SUPABASE_URL` é a URL do projeto Supabase (`https://seu-projeto.supabase.co`), **não** a string de conexão PostgreSQL (`postgresql://...`).

### ❌ "401 Unauthorized"

**Problema:** Token inválido ou ausente ao chamar endpoints protegidos.

**Solução:** 
- Obtenha um novo token via Supabase Auth
- Verifique se está enviando `Authorization: Bearer <TOKEN>` no header
- Confirme se o token não expirou

### ❌ "403 Forbidden"

**Problema:** Usuário tentando atualizar/deletar livro de outro usuário.

**Solução:** Apenas o owner (quem criou) pode modificar ou deletar o livro. Use sua própria autenticação.

### ❌ "Cannot GET /books" (servidor local)

**Problema:** Servidor não está rodando.

**Solução:** 
```bash
npm install
npm run dev
```

---

## 📝 Notas Importantes

- ✅ A tabela `books` **deve ser criada** no Supabase antes de usar a API
- ✅ Use um **usuário do Supabase Auth** para obter tokens (crie em `Authentication` → `Users`)
- ✅ O **Service Role Key** deve ficar seguro no servidor (só na variável de ambiente)
- ✅ Apenas o **owner** (quem criou) pode atualizar ou deletar seus livros
- ✅ Plano gratuito do Render hibernará se inativo por 15 minutos (cold start)
- ✅ Todos os erros retornam JSON com status e mensagem

---

## 🔄 Atualizações

Para enviar mudanças para produção:

1. **Commit e push** para o GitHub:

   ```bash
   git add .
   git commit -m "feat: descrição da mudança"
   git push origin OFFSET-ENTERPRISE
   ```

2. **Render** detectará automaticamente e fará o deploy (se auto-deploy estiver ativo)

3. **Verifique** o novo deploy:

   ```bash
   curl -s https://api-att-1.onrender.com/books | jq
   ```

---

## 📚 Estrutura do Projeto

```
/
├── src/
│   ├── app.js                    # Express app initialization
│   ├── server.js                 # Server startup
│   ├── supabaseClient.js         # Supabase client config
│   ├── controllers/
│   │   └── books.js              # CRUD business logic
│   ├── routes/
│   │   └── books.js              # REST endpoints
│   ├── validators/
│   │   └── bookValidator.js      # Zod validation schemas
│   └── middlewares/
│       ├── auth.js               # JWT authentication
│       └── errorHandler.js       # Centralized error handling
├── db/
│   └── migrations/
│       └── create_books_table.sql # PostgreSQL schema
├── tests/
│   └── books.test.js             # Jest unit tests
├── Dockerfile                     # Docker config (Node 20-alpine)
├── render.yaml                    # Render deploy config
├── jest.config.js                # Jest configuration
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

---

## 🔐 Segurança

- ✅ **Variáveis sensíveis** armazenadas em `.env` (não commitadas)
- ✅ **Autenticação JWT** via Supabase Auth
- ✅ **Validação de entrada** com Zod (tipos + regras)
- ✅ **Tratamento de erro** padronizado (sem stack traces expostos)
- ✅ **Service Role Key** mantida apenas no servidor
- ✅ **Row Level Security** configurável no Supabase

---

## 📞 Links Importantes

- 🔗 **API Online**: https://api-att-1.onrender.com
- 🔗 **Repositório GitHub**: https://github.com/OFSETE/API-ATT
- 🔗 **Branch de Entrega**: `OFFSET-ENTERPRISE`
- 🔗 **Referência**: https://github.com/spaaws/news

---

**Desenvolvido com Node.js + Express + Supabase + Docker** ✨
