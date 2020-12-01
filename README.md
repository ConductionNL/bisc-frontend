# bisc-taalhuizen

## Frontend setup

- `npx create-react-app bisc-taalhuizen --template typescript`
- `npm i react-router-dom @types/react-router-dom node-sass classnames @types/classnames @apollo/client graphql`
- `npm i --save-dev prettier @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/fragment-matcher @graphql-codegen/introspection`

## Build Docker containers

### Frontend

```
cd client
GIT_COMMIT_HASH=`git rev-parse HEAD`
docker build -t lifely/bisc-frontend:$GIT_COMMIT_HASH .
docker push lifely/bisc-frontend:$GIT_COMMIT_HASH
```

### Backend

```
cd server
GIT_COMMIT_HASH=`git rev-parse HEAD`
docker build -t lifely/bisc-backend:$GIT_COMMIT_HASH .
docker push lifely/bisc-backend:$GIT_COMMIT_HASH
```

### Deploy

**Server config** 

On the server we might have to change the `MaxSessions` setting to `MaxSessions 500` in `/etc/ssh/sshd_config`, to allow docker-compose:
```
nano /etc/ssh/sshd_config
service ssh restart
```
See https://unix.stackexchange.com/a/87532

**Deploy**

```
GIT_COMMIT_HASH=`git rev-parse HEAD` DOCKER_HOST="ssh://root@157.245.65.224" DEPLOY_ENV="staging" DEPLOY_GRAPHQL_URI="https://bisc-staging.lifely.nl/graphql" docker-compose -f docker-compose-remote.yml up -d
```