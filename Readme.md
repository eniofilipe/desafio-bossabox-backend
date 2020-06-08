FORMAT: 1A
HOST: 

# DESAFIO BACKEND BOSSABOX

Documentação API Desafio BossaBox.

# Group Usuário

## Usuário [/user]

### Cadastrar usuário [POST]
+ Request Create User
    
    + Headers

            Content-Type: application/json

    + Attributes (CreateUser)


+ Response 201 (application/json)

    + Attributes (User)

+ Response 400 (application/json)

    + Body
            
            "User exists!"

# Group Sessão

## Sessão [/session]

### Criar sessão [POST]

+ Request Criar Sessão

  + Headers
        
        Content-Type: application/json
  
  + Attributes (CreateSession)

+ Response 201 (application/json)

   + Attributes (Session) 

+ Response 401 (application/json)

    + Body

            "Password does not match"

+ Response 401 (application/json)

    + Body

            "User not exist"
# Group Ferramentas

## Ferramentas [/tools]

### Cadastrar nova ferramenta [POST]

+ Request Cadastrar Ferramenta

  + Headers
        
        Authorization: Token JWT
        Content-Type: application/json
  
  + Attributes (CreateTool)

+ Response 201 

  + Headers
        
        Content-Type: application/json

   + Attributes (Tool) 

### Listar todas ferramentas [GET]

+ Request

  + Headers

        Authorization: Token JWT

+ Response 201 

  + Headers
        
        Content-Type: application/json

  + Attributes (array[Tool])
   
## Listar por tag [/tools{?tag}]

+ Parameters

  + tag (string, optional) - Filtro de tag 

### Listar ferramentas por tag [GET]

+ Request

  + Headers

        Authorization: Token JWT

+ Response 201 

  + Headers
        
        Content-Type: application/json

  + Attributes (array[Tool])

## Remover ferramenta [/tools/{id}]

+ Parameters

  + id (number, required) - Identificador da ferramenta

### Remover ferramenta por id [DELETE]

+ Request

  + Headers

        Authorization: Token JWT

+ Response 204 No Content


# Data Structures

## User (object)
+ id (string) - Identificador do usuário
+ name (string) - Nome do usuário
+ email (string) - Nome do usuário

## CreateUser (object)
+ name (string) - Nome do usuário
+ email (string) - Nome do usuário
+ password (string) - Senha do usuário
+ confirmPassword (string) - Confirmação de senha

## Session (object)
+ user (User) - Dados do usuário
+ token (string) - Token JWT

## CreateSession (object)
+ email (string) - Email do usuário
+ password (string) - Senha do usuário

## Tool (object)
+ id (string) - Identificador da ferramenta
+ title (string) - Título(Nome) da ferramenta
+ link (string) - Link de acesso da ferramenta
+ description (number) - Descrição da ferramenta 
+ tags (array[string]) - Palavras chave relacionada à ferramenta
+ idUser (string) - Identificador do usuário

## CreateTool (object)
+ title (string) - Título(Nome) da ferramenta
+ link (string) - Link de acesso da ferramenta
+ description (number) - Descrição da ferramenta 
+ tags (array[string]) - Palavras chave relacionada à ferramenta
