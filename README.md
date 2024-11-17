# Psicomigo - Aplicativo voltado para Saúde Mental 🧠

**Psicomigo** é um aplicativo de saúde mental projetado para apoiar pacientes e psicólogos. Ele permite que psicólogos enviem perguntas personalizadas diariamente aos pacientes, de acordo com seus casos, e fornece ferramentas para monitoramento e comunicação.

O aplicativo também oferece informações sobre saúde mental e contatos de emergência, além de gerar relatórios semanais para psicólogos com base nas respostas dos pacientes.

**Esse aplicativo foi feito com o intuito de me aprofundar na concepção e criação de um aplicativo, ele não é um produto real postado nas stores.**

## Funcionalidades Principais 🌟

- **Questionários Diários:** Perguntas personalizadas enviadas aos pacientes.
- **Respostas Dinâmicas:** Interface amigável para responder às perguntas.
- **Relatórios Semanais:** Geração automática de relatórios para psicólogos.
- **Informações Educativas:** Informações sobre saúde mental e contatos de emergência.
- **Gerenciamento Backend Robusto:** Uso de Redis, GraphQL, Apollo Server e TypeORM.

---

## Configuração do Ambiente de Desenvolvimento 🛠️

### Pré-requisitos

Certifique-se de ter as ferramentas abaixo instaladas no seu ambiente:

- **Node.js:** Recomendado a versão LTS.
- **Yarn:** Para gerenciar dependências.
- **Redis:** Para gerenciamento de sessões e assinaturas.

---

### Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_REPOSITORIO>
```

### Backend

#### 1. Entre na pasta do servidor:

```bash
cd backend
```

#### 2. Instale as dependências:

```bash
yarn install
```

#### 3. Configure o banco de dados (servidor):

Certifique-se de que um banco de dados Redis esteja em execução. Em seguida, configure as variáveis de ambiente no arquivo .env:

```bash
REDIS_URL=redis://localhost:6379
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_USERNAME=seu_usuario
TYPEORM_PASSWORD=sua_senha
TYPEORM_DATABASE=sua_base
TYPEORM_PORT=5432
```

#### 4. Inicie o servidor:

```bash
yarn dev
```

#### 5 (opcional). Nodemon:

Caso queira realizar alguma mudança no código, você precisarar rodar o compilador do typescript.
Para facilitar no desenvolvimento, há um comando pronto para rodar nodemon, que irá verificar se há mudanças no código e compilar automaticamente se houver.
Basta executar:

```bash
yarn watch
```

O backend estará acessível em http://localhost:4000.

---

### Frontend

#### 1. Acesse o diretório do front-end:

```bash
cd frontend
```

#### 2. Instale as dependências:

```bash
yarn install
```

#### 3. Inicie o aplicativo:

```bash
yarn start
```

O aplicativo estará acessível no Expo Go ou em http://localhost:8081.

---

Email: joaopedro_ymcmb@hotmail.com
