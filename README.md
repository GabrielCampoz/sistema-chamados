# Sistema de Chamados de Suporte

## Objetivo

Desenvolver uma aplicação web para organizar solicitações de suporte de uma empresa. Funcionários poderão abrir chamados e acompanhar o atendimento; atendentes poderão assumir solicitações, registrar comentários e resolver problemas.

O projeto também servirá como portfólio para vagas de desenvolvimento web, demonstrando TypeScript, construção e consumo de API REST, SQL, autenticação, testes e publicação em nuvem. O desenvolvimento será incremental, com entendimento das decisões e validação de cada etapa.

## Problema que a aplicação resolve

Pedidos de suporte espalhados por mensagens e e-mails dificultam acompanhar responsáveis, prioridades e soluções. O sistema centralizará essas informações e manterá o histórico de cada atendimento.

## Perfis de usuário

| Perfil | Permissões previstas |
| --- | --- |
| Funcionário | Abrir chamados, consultar seus próprios chamados e comentar neles. |
| Atendente | Consultar a fila de suporte, assumir chamados e atender os chamados atribuídos a ele. |
| Administrador | Gerenciar usuários e categorias, reatribuir chamados e consultar relatórios. |

As permissões serão verificadas pela API, além dos controles visuais da interface.

## Primeira versão — MVP

- Login com e-mail e senha, com armazenamento seguro das senhas.
- Cadastro inicial de usuários por script, sem cadastro público.
- Abertura de chamado com título, descrição e categoria.
- Prioridade baixa, média ou alta, inicialmente média e ajustável pela equipe de suporte.
- Listagem com paginação e filtros por status, prioridade e categoria.
- Página de detalhes com responsável, comentários e histórico.
- Atribuição de um atendente responsável.
- Alteração de status conforme as regras do atendimento.
- Painel com quantidade de chamados abertos, em atendimento e resolvidos.

### Fluxo principal

1. O funcionário faz login e descreve um problema.
2. O sistema cria o chamado com status ABERTO.
3. Um atendente assume o chamado, que passa para EM_ATENDIMENTO.
4. Funcionário e atendente trocam comentários.
5. O atendente registra a solução e marca o chamado como RESOLVIDO.
6. O funcionário pode reabrir seu chamado, informando o motivo; ele retorna para ABERTO e fica disponível na fila novamente.

### Regras de negócio

- Um funcionário só pode consultar e comentar seus próprios chamados.
- Um chamado possui no máximo um atendente responsável por vez.
- Dois atendentes não podem assumir o mesmo chamado simultaneamente.
- Apenas o atendente responsável ou um administrador pode resolver um chamado em atendimento.
- A resolução exige uma descrição da solução.
- A reabertura é permitida ao autor do chamado ou ao administrador, exige motivo e remove a atribuição anterior.
- Mudanças de status, prioridade e responsável registram autor, data e valores anteriores e novos.
- O histórico é criado pelo servidor e não pode ser editado pelos usuários.
- Usuários e categorias com histórico serão desativados, preservando os registros existentes.
- Todas as datas serão armazenadas em UTC e apresentadas no fuso escolhido para a interface.

## Tecnologias previstas

| Camada | Tecnologia | Aplicação no projeto |
| --- | --- | --- |
| Front-end | React, TypeScript e CSS | Telas, formulários, filtros e consumo da API. |
| Back-end | Node.js, NestJS e TypeScript | API, validação, autenticação e regras de negócio. |
| Banco de dados | PostgreSQL | Persistência, relacionamentos, transações e consultas SQL. |
| Acesso ao banco | Prisma | Modelos, migrações e consultas da aplicação. |
| Documentação da API | OpenAPI/Swagger | Descrição e exploração das rotas. |
| Ambiente local | Docker e Docker Compose | Banco e serviços executados de forma reproduzível. |
| Automação | GitHub Actions | Verificação de tipos, testes e compilação. |
| Nuvem | AWS | Hospedagem da aplicação, banco e logs. |

A AWS será a nuvem inicial. Os serviços específicos serão definidos na etapa de publicação, considerando custo e simplicidade. Azure é uma alternativa futura; a primeira versão não utilizará duas nuvens.

## Modelo de dados inicial

| Tabela | Informações principais |
| --- | --- |
| users | Identificador, nome, e-mail único, hash da senha, perfil e situação ativa. |
| categories | Identificador, nome e situação ativa. |
| tickets | Título, descrição, autor, atendente opcional, categoria, prioridade, status e datas. |
| comments | Chamado, autor, mensagem e data de criação. |
| ticket_events | Chamado, autor, tipo de evento, valores anteriores e novos, motivo ou solução e data. |

Um usuário pode abrir vários chamados. Cada chamado pertence a uma categoria, pode ter um atendente e possui vários comentários e eventos. Índices e campos definitivos serão definidos junto às consultas e migrações.

## Telas previstas

1. Login.
2. Meus chamados e formulário de abertura, para funcionários.
3. Fila de atendimento, para atendentes e administradores.
4. Detalhes do chamado, comentários e histórico.
5. Painel de indicadores.
6. Administração de usuários e categorias.

## API inicial prevista

| Método e rota | Finalidade |
| --- | --- |
| GET /health | Verificar se a API está respondendo. |
| POST /auth/login | Autenticar usuário. |
| GET /auth/me | Consultar usuário autenticado. |
| POST /tickets | Abrir chamado. |
| GET /tickets | Listar chamados respeitando perfil e filtros. |
| GET /tickets/:id | Consultar detalhes de um chamado autorizado. |
| POST /tickets/:id/assign | Assumir chamado ou atribuí-lo, conforme o perfil. |
| PATCH /tickets/:id/priority | Atualizar prioridade. |
| POST /tickets/:id/resolve | Resolver chamado com descrição da solução. |
| POST /tickets/:id/reopen | Reabrir chamado com motivo. |
| POST /tickets/:id/comments | Adicionar comentário. |
| GET /tickets/:id/events | Consultar histórico. |
| GET /reports/summary | Consultar indicadores autorizados. |

As rotas de administração e o formato de autenticação serão detalhados na implementação.

## Etapas de desenvolvimento

- [x] Criar a pasta e documentar a proposta.
- [ ] Preparar repositório, back-end, front-end e PostgreSQL local.
- [ ] Modelar o banco, criar migrações e dados fictícios.
- [ ] Implementar login e permissões.
- [ ] Implementar abertura, listagem e detalhes dos chamados.
- [ ] Implementar atribuição, comentários, resolução, reabertura e histórico.
- [ ] Construir as telas e integrar com a API.
- [ ] Criar relatórios com SQL e documentar consultas.
- [ ] Verificar os fluxos principais e automatizar as verificações.
- [ ] Publicar na AWS após estimar custos e configurar alertas.
- [ ] Finalizar documentação, capturas de tela e vídeo de demonstração.

## Critérios de conclusão do MVP

- Funcionário consegue abrir um chamado e acompanhar o atendimento pelo navegador.
- Atendente consegue assumir, comentar e resolver um chamado.
- Funcionário consegue reabrir um chamado resolvido com justificativa.
- A API impede acesso indevido, inclusive ao informar diretamente o identificador de um chamado de outro usuário.
- A atribuição simultânea não produz dois responsáveis.
- Alterações e seus eventos são gravados de forma consistente em transações.
- Testes cobrem permissões, transições de status e concorrência na atribuição.
- Interface apresenta estados de carregamento, erro e ausência de resultados.
- Documentação explica instalação, configuração, execução e testes.
- Demonstração utiliza dados fictícios; segredos ficam fora do repositório.

## Evoluções após a primeira versão

- Anexos armazenados na nuvem, com validação e controle de acesso.
- Notificações por e-mail.
- Prazos de atendimento e indicadores de atraso.
- Avaliação do atendimento.
- Relatórios de tempo de resolução, com regras explícitas para chamados reabertos.
- Pesquisa textual e filtros avançados.

## Estado atual

Apenas a especificação foi criada. A aplicação, o banco, os testes e os recursos de nuvem ainda não foram implementados.

O próximo passo é preparar o ambiente local e entregar uma API com a rota GET /health, uma página inicial e uma conexão com o PostgreSQL.
