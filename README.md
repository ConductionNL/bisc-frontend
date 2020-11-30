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