## Upload-s3

## Descrição

Este projeto foi desenvolvido como uma demonstração, com o objetivo principal de aprimorar habilidades na manipulação de dados na nuvem,
com uma arquitetura muito simples e fácil de manter.

**obs** : Decidi optar em fazer um projeto com arquitetura simples porque esse é um projeto simples .
devemos dosar quanto colocar complexidade em um projeto.

## **Tecnologias utlizadas**

- **Node js**
- **Typescript**
- **Aws-sdk**
- **Express**
- **husky**
- **prettier**
- **zod**

## **Funcionalidades**

- [x] É possivel realizar upload de um arquivo
- [x] É possivel realizar upload de multiplos arquivo por vez
- [x] É possivel deletar um arquivo
- [x] É possivel pegar dados de um arquivo
- [x] É possivel listar todos os arquivos
- [ ] É possivel listar arquivos pelos tipos. ex : **pdf**, **jpeg** .

## **Endpoints da aplicação**

- **POST** `/upload` : faz o upload de um unico arquivo na nuvem
- **POST** `/uploads` : faz o upload de vários arquivos na nuvem
- **GET** `/upload/:key` : retorna dados de um arquivo, ex : bytes, nome dentre outros...
- **GET** `/upload/all` : retorna todos os arquivos
- **DELETE** `/upload/:key` : apaga um arquivo

## Como rodar esse projeto

- Cerfique-se de ter o node intalado
- Clone esse repositorio `git clone : https://github.com/hebertsanto/upload-s3.git`
- Navegue até o projeto e rode o seguinte comando `npm install

- Crie um arquivo `.env` e crie as varáveis de ambiente com as suas credencias do s3 da aws.
  veja como definir as variáveis no arquivo `.env.exemple`
- Depois é so rodar o servidor com o seguinte comando: `npm run dev`

## Console da aws com alguns arquivos

![Captura de tela de 2024-04-06 20-31-11](https://github.com/hebertsanto/upload-s3/assets/108555424/a3a31951-33d3-4955-8458-62c30c4ad5d4)
