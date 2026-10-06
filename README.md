# Sistema de Chamados

Aplicação web para registrar e acompanhar solicitações de suporte, desenvolvida com React e TypeScript como projeto de aprendizado e portfólio. Em desenvolvimento.

**[Acessar demonstração](https://gabrielcampoz.github.io/sistema-chamados/)**

## Funcionalidades

- Criação de chamados com título, descrição, categoria e prioridade.
- Listagem e filtro por status, com opção de marcar chamados como resolvidos.
- Indicadores de chamados totais, abertos e resolvidos.
- Persistência no navegador e tratamento de falhas de armazenamento.
- Interface responsiva.

Os dados ficam no `localStorage` e não são compartilhados entre usuários ou dispositivos. Limpar os dados do site remove os chamados salvos.

## Tecnologias

React, TypeScript, Vite e CSS Modules. Testes com Vitest e Testing Library, análise de código com Oxlint e publicação no GitHub Pages via GitHub Actions.

## Como executar

Use Node.js 24 (mesma versão da publicação) e npm.

```bash
git clone https://github.com/GabrielCampoz/sistema-chamados.git
cd sistema-chamados
npm ci
npm run dev
```

Abra o endereço indicado no terminal.

## Comandos

Execute na raiz do projeto:

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm test` | Executa os testes. |
| `npm run lint` | Analisa o código. |
| `npm run build` | Verifica o TypeScript e gera a versão de produção. |
| `npm run preview` | Visualiza localmente o build gerado. |

## Próximos passos

- [ ] Registrar datas de criação e resolução.
- [ ] Permitir edição e reabertura de chamados.
- [ ] Adicionar busca por texto e filtros por categoria e prioridade.
