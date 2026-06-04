# Guia Oficial para Agentes de IA e Desenvolvedores (AGENTS.md)

Este documento serve como a **fonte da verdade** e guia de contexto oficial para qualquer Agente de IA (Cursor, Copilot, Codex, etc.) ou desenvolvedor trabalhando no projeto **Pijamariact**. 

Leia atentamente as diretrizes, padrões e regras arquiteturais a seguir ANTES de escrever, modificar ou refatorar qualquer código.

---

## 1. Visão Geral do Projeto

**Objetivo da aplicação:** Pijamariact é uma aplicação web moderna com áreas públicas e administrativas (`/app/(public)` e `/app/admin`), voltada para o nicho de pijamas.
**Arquitetura geral:** O projeto segue uma arquitetura baseada no **Next.js App Router**, utilizando Server Components e Client Components onde necessário, com comunicação forte tipada entre frontend e banco de dados.
**Stack principal:** Next.js, React 19, TypeScript, TailwindCSS v4, Drizzle ORM, Supabase (Postgres) e Better Auth.
**Responsabilidade de cada camada:**
- **Frontend / UI:** Componentes React (Shadcn UI + Tailwind) separados por responsabilidade (Server vs Client).
- **Lógica e Ações:** Next.js Server Actions localizadas na pasta `/actions`.
- **Autenticação:** Better Auth utilizando o banco PostgreSQL, gerenciando sessões e controle de acesso (Roles: admin, master, user).
- **Banco de Dados (ORM):** Drizzle ORM acessando Supabase PostgreSQL.

---

## 2. Stack Utilizada

* **Next.js (App Router):** Framework principal. Responsável por roteamento, renderização (SSR, SSG, RSC) e APIs/Server Actions.
* **React 19:** Biblioteca base de UI, usufruindo das novas features do React 19 (Server Components, Actions, etc).
* **TypeScript:** Garantia de tipagem estática e segurança. OBRIGATÓRIO em todos os arquivos.
* **Supabase (PostgreSQL) + Drizzle ORM:** O Supabase fornece a instância PostgreSQL. O **Drizzle ORM** é a camada de abstração usada para criar queries e schemas (`db/schema`).
* **Better Auth:** Solução de autenticação do projeto. Substitui o Supabase Auth para maior controle de schemas de usuário e plugins (como roles `admin`, `master`).
* **Tailwind CSS v4:** Framework CSS utilitário para estilização e responsividade.
* **Shadcn UI / Radix UI / Framer Motion / Lucide:** Sistema de componentes e ícones, fornecendo acessibilidade e interações fluidas.
* **React Hook Form + Zod:** Utilizados para validação de formulários tanto no client quanto via schemas no server.
* **ESLint / Prettier:** Ferramentas de lint e padronização.

---

## 3. Estrutura de Pastas

* `/actions`: Next.js Server Actions para mutação de dados e lógica de backend. Mantém os componentes limpos.
* `/app`: Rotas da aplicação seguindo o App Router. 
  * `/app/(public)`: Área pública e rotas não autenticadas/comuns.
  * `/app/admin`: Dashboard e rotas restritas a usuários administradores.
  * `/app/api`: Rotas de API tradicionais (se necessário, ex: webhooks).
* `/components`: Componentes reutilizáveis globais da aplicação.
  * `/components/ui`: Componentes base (geralmente gerados pelo Shadcn UI).
* `/db`: Configurações de conexão e instâncias do Drizzle.
  * `/db/schema`: Definições de tabelas e esquemas (ex: `users.ts`, `products.ts`, `categories.ts`).
* `/hooks`: Custom hooks React.
* `/lib`: Utilitários, configurações de libs externas e inicializações (ex: `auth.ts`, `utils.ts`).
* `/public`: Assets estáticos, fontes, imagens públicas.
* `/types`: Definições globais de interfaces e tipos do TypeScript.

---

## 4. Padrões Arquiteturais

* **Server Components vs Client Components:**
  * **Server Components (Default):** Use sempre que possível para fetch de dados diretos, acesso a DB e melhor performance/SEO. NÃO coloque `'use client'` se o componente não precisar de estados, eventos (`onClick`) ou hooks (`useState`, `useEffect`).
  * **Client Components:** Adicione `'use client'` no topo do arquivo apenas para interatividade ou acesso a APIs do navegador.
* **Estratégia de Fetch de Dados:**
  * Prefira fazer fetch diretamente nos Server Components (ex: no `page.tsx`).
  * Para mutações (Create, Update, Delete), utilize **Server Actions** declaradas na pasta `/actions`.
* **Separação de Responsabilidades:** 
  * As rotas (`page.tsx`) não devem conter queries SQL complexas inline. 
  * Validações de payload DEVEM usar o `Zod`.
* **Reutilização e Composição:**
  * Prefira compor pequenos componentes. Deixe a UI modularizada na pasta `/components` e reutilize em vez de duplicar layouts.

---

## 5. Supabase (Postgres) e Drizzle ORM

O projeto utiliza o banco de dados do **Supabase**, mas a manipulação é feita com **Drizzle ORM** e **Better Auth** gerencia os usuários.

* **Autenticação (Better Auth):**
  * Sessões e cookies são gerenciados pelo `lib/auth.ts`.
  * Roles disponíveis configuradas nos plugins: `user` (default), `registered`, `admin`, `master`.
  * Utilize os métodos do Better Auth para checar a sessão no Server ou no Client.
* **Estrutura Esperada de Tabelas:** 
  * As tabelas são definidas em `/db/schema`.
  * Sempre use `pgTable` do Drizzle ORM.
  * NUNCA crie tabelas diretamente pelo painel do Supabase. Edite os schemas em TypeScript e gere migrations (`npx drizzle-kit`).
* **Segurança de Dados:**
  * Nunca exponha a variável de ambiente `DATABASE_URL` para o cliente (nenhum prefixo `NEXT_PUBLIC_`).
  * Sempre valide permissões (roles `admin` ou `master`) em Server Actions antes de executar mutações sensíveis.

---

## 6. Convenções de Código

* **Naming Conventions:**
  * Pastas e Arquivos de Componentes/Rotas: `kebab-case` para pastas (`app/minha-rota`) ou `PascalCase` para componentes exportados.
  * Funções, Variáveis e Hooks: `camelCase`.
  * Schemas do BD: `camelCase` e sufixo descritivo (ex: `usersTable`, `productsTable`).
* **Organização de Imports:**
  1. Libs externas (React, Next, etc).
  2. Aliases do projeto (`@/components`, `@/lib`, `@/db`).
  3. Imports relativos.
* **Tipagem Obrigatória:** NENHUM uso de `any`. Utilize inferência do TypeScript ou crie interfaces específicas. Drizzle e Better Auth fornecem tipos inferidos.
* **Async/Await:** Sempre utilize `async/await` com blocos `try/catch` em vez de `.then().catch()`.

---

## 7. Componentização

* **Quando Criar:** Se a UI se repete ou possui lógicas isoladas, extraia para `/components`.
* **Separação UI / Lógica:** 
  * Componentes devem idealmente ser "burros" (Dumb Components) recebendo dados por `props`.
  * O `page.tsx` atua como "Smart Component", buscando os dados e passando-os para a UI.
* **Responsividade:** Use utilitários do Tailwind (`sm:`, `md:`, `lg:`) garantindo o *Mobile First*.

```tsx
// Exemplo de Componente Típico
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function CustomButton({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 font-medium transition-colors",
        variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300",
        className
      )}
      {...props}
    />
  );
}
```

---

## 8. UI/UX (Tailwind v4 e Shadcn)

* **Padrão Visual:** 
  * Utilize as cores definidas nos estilos globais / Tailwind.
  * Evite adicionar valores hexadecimais *hardcoded* (`text-[#ff0000]`). Use as variáveis do tema.
* **Hierarquia Tipográfica:** Mantenha consistência (H1, H2, H3).
* **Estados Visuais Obrigatórios:**
  * **Loading:** Telas devem possuir feedback visual ao buscar dados (Esqueletos ou Spinners).
  * **Empty:** Listas sem itens não devem ser apenas telas brancas, adicione uma mensagem clara (ex: "Nenhum produto encontrado").
  * **Error:** Mensagens Toast amigáveis e claras usando o componente de Toast do Shadcn, sem expor erros de servidor ao usuário.

---

## 9. Performance

* **Server Components Priorizados:** Evita enviar JavaScript para o navegador.
* **Lazy Loading / Dynamic Imports:** Utilize `next/dynamic` para componentes pesados carregados sob demanda.
* **Evitar re-renderizações:** Em Client Components pesados, valide necessidade de `useMemo` ou `useCallback`.
* **Imagens:** Utilize SEMPRE `next/image` (`<Image />`) para otimização de peso e dimensões.

---

## 10. Segurança

* **Nunca Expor Secrets:** Nenhuma chave secreta em arquivos `.tsx` ou sem restrição, tudo no arquivo `.env` consumido no servidor.
* **Validação de Inputs:** TODO payload de requisição e formulário deve passar pelo `Zod`.
* **Proteção de Rotas Admin:** A pasta `app/admin` deve verificar se a sessão de usuário (via Better Auth) possui as Roles adequadas. Redirecionar em caso de recusa.
* **Proteção de Server Actions:** Não confie no cliente! Toda Action deve re-validar a autenticação de quem a chama.

---

## 11. Fluxo de Desenvolvimento

* **Rodar Localmente:** 
  * `npm install`
  * `npm run dev`
* **Migrations / Banco de Dados (Drizzle):**
  * Para gerar migrações: `npx drizzle-kit generate`
  * Para rodar migrações (conforme scripts locais de Drizzle).
* **Build e Lint:**
  * `npm run lint` (verifica erros e formatação).
  * `npm run build` (garanta que constrói com sucesso antes de merge).

---

## 12. Regras para Agentes de IA

### ✅ Agentes DEVEM:
* Respeitar e utilizar a arquitetura e dependências existentes (Drizzle para queries, Better Auth para logins).
* Reutilizar componentes do Shadcn UI contidos na pasta `components/ui`.
* Manter consistência visual com Tailwind v4.
* Priorizar tipagem estrita do TypeScript em tudo (Inferência Zod / Drizzle).
* Tratar e antecipar estados de loading e erro.

### ❌ Agentes NÃO DEVEM:
* Tentar instalar `@supabase/supabase-js` para autenticação ou queries. (O projeto já usa Better Auth e Drizzle Postgres).
* Criar arquivos em pastas erradas ou alterar estrutura de diretórios sem necessidade.
* Fazer queries SQL via `process.env.DATABASE_URL` diretamente. Use sempre a instância de `db` de `db/index.ts`.
* Adicionar `'use client'` em arquivos que fazem fetches seguros (ou seja, devem continuar sendo Server Components).
* Misturar regras de negócios no componente de interface UI.

---

## 13. Padrões de Commit

* Siga o padrão **Conventional Commits**:
  * `feat:` Novas funcionalidades.
  * `fix:` Correções de bugs.
  * `refactor:` Refatorações sem alteração de funcionalidade.
  * `chore:` Atualizações de build, dependências ou organização de arquivos.
  * `style:` Formatações, ponto-e-vírgula (não afeta o sentido lógico).

---

## 14. Checklist Antes de Commitar

* [ ] Types OK (Sem erros `any` e de build do TS).
* [ ] Build OK (Comando `npm run build` passa com sucesso).
* [ ] Lint OK (Comando `npm run lint` passa sem warnings bloqueantes).
* [ ] Responsividade testada para Mobile/Desktop.
* [ ] Sem "console.log" esquecidos em produção.
* [ ] Sem imports não utilizados.
* [ ] Sem secrets ou keys expostas.

---

*(Fim do documento)*
