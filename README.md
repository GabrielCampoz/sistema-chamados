# Sistema de Chamados

Aplicação web para registrar, organizar e acompanhar solicitações de suporte. O projeto foi criado para praticar o desenvolvimento de uma interface com React e TypeScript, incluindo gerenciamento de estado, persistência no navegador, testes automatizados e publicação contínua.

> [!IMPORTANT]
> Este projeto ainda está em desenvolvimento. Novas funcionalidades, melhorias de experiência e mudanças na arquitetura serão adicionadas ao longo da evolução da aplicação.

## Demonstração

A versão publicada pode ser acessada em:

**[Abrir o Sistema de Chamados](https://gabrielcampoz.github.io/sistema-chamados/)**

## Funcionalidades disponíveis

- Criação de chamados com título e descrição.
- Classificação por categoria:
  - Hardware
  - Software
  - Rede
  - Acesso
- Definição de prioridade baixa, média ou alta.
- Listagem dos chamados em cartões.
- Identificação visual de categoria, prioridade e status.
- Filtro por chamados abertos ou resolvidos.
- Alteração do status de um chamado para resolvido.
- Indicadores com a quantidade total, aberta e resolvida.
- Armazenamento dos chamados no `localStorage` do navegador.
- Recuperação dos chamados ao atualizar ou reabrir a página.
- Tratamento de dados locais ausentes ou inválidos.
- Interface responsiva para computadores e dispositivos móveis.
- Publicação automática no GitHub Pages.

## Como a aplicação funciona

O componente principal mantém a lista de chamados no estado do React. Quando um chamado é criado ou resolvido, o estado é atualizado e sincronizado com o `localStorage`.

Ao iniciar a aplicação, os dados são carregados do navegador. Cada navegador e dispositivo possui seu próprio armazenamento, portanto os chamados cadastrados não são compartilhados entre visitantes.

O fluxo atual é:

1. O usuário abre o formulário de novo chamado.
2. Informa título, descrição, categoria e prioridade.
3. O chamado é criado com o status `aberto`.
4. A lista e os indicadores são atualizados.
5. Os dados são salvos no navegador.
6. Um chamado aberto pode ser marcado como `resolvido`.

## Tecnologias

### Aplicação

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- CSS

### Qualidade e testes

- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

### Publicação

- GitHub Actions
- GitHub Pages

## Pré-requisitos

Para executar o projeto localmente, é necessário ter o [Node.js](https://nodejs.org/) e o npm instalados. O workflow de publicação utiliza Node.js 24.

## Executando localmente

Clone o repositório:

```bash
git clone https://github.com/GabrielCampoz/sistema-chamados.git
```

Entre na pasta do frontend:

```bash
cd sistema-chamados/frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O terminal mostrará o endereço local em que a aplicação está disponível.

## Scripts disponíveis

Execute os comandos dentro da pasta `frontend`.

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm test` | Executa os testes automatizados uma vez. |
| `npm run lint` | Analisa o código com o Oxlint. |
| `npm run build` | Verifica o TypeScript e gera o build de produção. |
| `npm run preview` | Executa localmente uma prévia do build. |

## Testes

Os testes atuais verificam comportamentos importantes da aplicação, incluindo:

- carregamento de chamados salvos;
- salvamento de novos chamados;
- recuperação segura quando o armazenamento contém dados inválidos;
- rejeição de dados locais em formato incorreto;
- cálculo dos indicadores por status.

Para executar:

```bash
cd frontend
npm test
```

## Estrutura do projeto

```text
sistema-chamados/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ListaChamados.tsx
│   │   │   └── NovoChamado.tsx
│   │   ├── types/
│   │   │   └── Chamado.ts
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Modelo de chamado

Cada chamado possui a seguinte estrutura:

```ts
type Chamado = {
  id: number
  titulo: string
  descricao: string
  categoria: "hardware" | "software" | "rede" | "acesso"
  prioridade: "baixa" | "media" | "alta"
  status: "aberto" | "resolvido"
}
```

## Publicação

O projeto é compilado e publicado automaticamente no GitHub Pages pelo workflow `.github/workflows/deploy-pages.yml`.

Em cada push para a branch `main`, o workflow:

1. baixa o código do repositório;
2. configura o Node.js;
3. instala as dependências;
4. executa os testes;
5. gera o build de produção;
6. publica o conteúdo de `frontend/dist` no GitHub Pages.

## Próximas etapas

- [ ] Registrar as datas de criação e resolução.
- [ ] Permitir a edição de chamados.
- [ ] Permitir a reabertura de chamados resolvidos.
- [ ] Adicionar exclusão com confirmação.
- [ ] Implementar busca por título e descrição.
- [ ] Adicionar filtros por categoria e prioridade.
- [ ] Adicionar ordenação por data e prioridade.
- [ ] Exibir mensagens de validação diretamente no formulário.
- [ ] Ampliar a cobertura de testes dos fluxos da interface.
- [ ] Criar uma API para centralizar os chamados.
- [ ] Adicionar um banco de dados.
- [ ] Implementar autenticação e perfis de usuário.
- [ ] Compartilhar chamados entre diferentes usuários e dispositivos.

---

Projeto desenvolvido para aprendizado e evolução contínua em desenvolvimento web com React e TypeScript.
