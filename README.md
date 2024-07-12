# YAPE CHALLENGE

## Requirements

- Node >= 22.2.0 
- Docker 

## Initial setup 

Execute docker for create container 
  - postgress 
  - database
  - kafka
  - zookeeper 

```sh
   docker-compose up -d
 ```
## Initial microservice 
  - Microservice Anti fraud
  - Microservice Transaction

### to Transaction 

move to project
```sh
   cd transaction
```

copy `env.example` file
```sh
   cp env.example .env
```

install dependencies
```sh
   npm install 
```

up nest project
```sh
   npm run start:dev 
```

### to Anti fraud 

move to project
```sh
   cd anti-fraud
```

copy `env.example` file
```sh
   cp env.example .env
```

install dependencies
```sh
   npm install 
```

up nest project
```sh
   npm run start:dev 
```

### Documentation API 

you can create a transaction in from curl or Swagger UI in [localhost:3000](http://localhost:3000/api)

Swagger UI :  [localhost:3000](http://localhost:3000/api)

create transaction
```sh
curl -X 'POST' \
  'http://localhost:3000/transaction' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "accountExternalIdDebit": "240e3c1e-f1b6-4610-8ade-f4c151000abb",
  "accountExternalIdCredit": "821ce7f2-fcc4-42c1-944a-978c3d7af351",
  "transferType": 1,
  "value": 1200
}'
```

response create transaction
```json
{
  "transactionExternalId": "08f4358e-ce8a-48fa-8b56-c6395b026dde",
  "message": "Transaction created successfully"
}
```

get transaction 

```sh
curl -X 'GET' \
  'http://localhost:3000/transaction/08f4358e-ce8a-48fa-8b56-c6395b026dde' \
  -H 'accept: */*'
```

response get transaction  

```json
{
  "transactionExternalId": "08f4358e-ce8a-48fa-8b56-c6395b026dde",
  "transactionType": {
    "name": 1
  },
  "transactionStatus": {
    "name": "pending"
  },
  "value": 1200,
  "createdAt": "2024-07-12T09:05:11.668Z"
}
```

## Run Test

```sh
   npm run test 
```
