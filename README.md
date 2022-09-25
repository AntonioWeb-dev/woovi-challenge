# woovi-challenge

  Este é um projeto de desafio da Woovi, onde deve-se desenvolver alguma aplição usando a stack deles.

  Woovi-challenge: https://gist.github.com/sibelius/fe9bb57a2a00672459fa616523507f73

# Objetivo

  Este projeto onde estou desenvolvendo uma abstração de transações pix entre users.

  Funcionalidades:
  
    - CRUD de usuários.
    - Criação de cobranças para usuários especificos.
    - Criação de cobranças instantâneas.
    - Criação de cobranças para grupos(com partes definidas).
    
 # Dependências:
  
   - Koa
   - graphq
   - graphql-relay
   - typescript
   - bcryptjs
   - mongoose
   - uuid
   - docker compose(mongodb)

# Executar API: 
  <h4>Caso você queira testar localmente, faça o passo a passo:</h4>
  
    git clone https://github.com/AntonioWeb-dev/woovi-challenge
    cd woovi-challenge
    yarn
    docker-compose up -d
    yarn dev
