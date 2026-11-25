# Rastro Dashboard

Dashboard demonstrativa do conceito Rastro, feita em Next.js com App Router, TypeScript e CSS. Não usa backend, banco de dados ou credenciais externas.

## Dados de demonstração

Todos os saldos, cliques, vendas, conversões, comissões e metas exibidos são fictícios e servem apenas para demonstrar o fluxo. Não representam dados reais da YouShop nem previsão de renda.

## Desenvolvimento local

Requer Node.js 20 ou superior e pnpm 11.

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Build

```bash
pnpm typecheck
pnpm build
```

O build exporta a interface estática para `out/`, sem servidor ou banco de dados.

## Publicação na Vercel

1. Envie este projeto para um repositório Git conectado à sua conta Vercel.
2. Importe o repositório na Vercel.
3. Selecione o preset **Next.js**. O `pnpm build` gera a exportação estática (`out/`); a Vercel detecta os comandos do projeto automaticamente.
4. Não são necessárias variáveis de ambiente para a versão demonstrativa.

A rota `/manus-routes.json` lista as rotas do dashboard para a prévia gerenciada.
