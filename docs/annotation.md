# Anotações de Estudo

## Principais Comandos

- Comandos do **NestJS**:
  - `npm run start:dev`: iniciar o nest no ambiente de desenvolvimento
  - `nest generate module categorias`: criar um módulo de categorias para agrupar o contexto de uma feature, no exemplo acima, feature de categorias
  - `nest generate resource categorias`: criar todos os recursos (todos os métodos http do REST, ou GraphQL, micro-serviço, etc) de uma feature, podendo criar todos os entry points do CRUD
  - `nest g service prisma`: gerar um serviço nest para agrupar os contratos de serviço do prisma
  - `nest generate filter prisma-client-exception`: gerar um filter para agrupar exceções do prisma
- Comandos do **Prisma**:
  - `npm install @prisma/client`: instalar o prisma client
  - `npx prisma init`: iniciar o prisma dentro da pasta raiz
  - `npx prisma migrate dev`: criar uma migração (versionamento) para o banco de dados
  - `npx prisma studio`: ferramenta que abre no browser para visualizar e manipular os dados dos banco de dados

## Anotações

### Diferença entre os métodos HTTP: Patch x Put

- `PUT`: Atualizar o recurso por **completo**, é obrigado a passar **TODOS** os dados
- `PATCH`: Atualização **parcial**, passar todos os dados, ou apenas um único grupo de dados

### Nest Repl

É possível rodar um ambiente REPL (Read-Eval-Print-Loop) para testar o back-end do nest pelo terminal, você pode chamar os métodos dos providers e controllers pelo terminal.

Você cria um arquivo repl.ts e testa usando o comando `npm run start -- --entryFile repl`

```ts
// repl.ts
import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}

bootstrap();
```
