# API-ATT
Criação de API crud

## API de Livros

Esta API implementa um CRUD para livros usando Supabase para autenticação e banco de dados.

Endpoints principais (JSON):

- GET /books — lista livros
- GET /books/:id — busca livro por id
- POST /books — cria livro (autenticado)
- PUT /books/:id — atualiza livro (autenticado, apenas owner)
- DELETE /books/:id — remove livro (autenticado, apenas owner)

Exemplo de payload para criar/atualizar:

```json
{
	"title": "O Senhor dos Anéis",
	"author": "J.R.R. Tolkien",
	"published_year": 1954,
	"genre": "Fantasia"
}
```

Variáveis de ambiente necessárias:

- SUPABASE_URL — URL do projeto Supabase
- SUPABASE_SERVICE_ROLE_KEY — service role key (usado pelo servidor para acesso ao banco)
- PORT — (opcional) porta onde a API roda

Como rodar localmente:

1. Copie `.env.example` para `.env` e preencha as variáveis.
2. Instale dependências: `npm install`
3. Executar: `npm run dev` (nodemon) ou `npm start`

Rodar testes:

```
npm test
```

Criar tabela no Supabase:

Copie o conteúdo de `db/migrations/create_books_table.sql` e execute no editor SQL do Supabase para criar a tabela `books`.

Deploy no Render:

- Crie um novo serviço Web no Render, conecte ao repositório GitHub.
- Configure as variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no painel do Render.
- Build & Start: `npm install` e `npm start`.
- Após deploy, teste os endpoints listados acima.

Link da API publicada no Render: (adicione aqui após o deploy)

