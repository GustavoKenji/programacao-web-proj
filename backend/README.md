# Projeto 3

O projeto 3 da disciplina de <b>Programação web</b> visa simular a api utilizada pelos alunos durante o desenvolvimento do projeto anterior.

Os seguintes requisitos devem ser satisfeitos:



## Como utilizar

Para rodar esse projeto localmente, primeiro é preciso entrar até a pasta onde ele está localizado e executar os seguinte comandos:

<i>Obs: É importante que haja uma instância do mongodb rodando localmente na porta 27017. Caso sua instância não esteja nessa URI, altere o arquivo o campo `mongoURL` no arquivo `config.js` para apontar para a Url do seu mongodb local.</i>

> Inserir os valores de cores dentro do banco de dados locais.

```bash
$ node launch.js
```

> Para rodar a aplicação em modo desenvolvimento, permite alteraçãoes enquanto mantém o servidor em pé:
```bash
$ npm run dev
```
> Para rodar a aplicação normalmente ou em um servidor remoto:
```bash
$ npm start
```

## Informações importantes

- Os nomes, hexadecimais e decimais das cores foram retirados de https://en.wikipedia.org/wiki/Web_colors .

## Critérios de avaliação

    [x] - verificação de preenchimento de campos obrigatório
    [x] - validação da unicidade e autenticidade de campos de email e login
    [ ] - permissão de publicação apenas ao usuário administrador
    [ ] - instalação de um serviço de hospedagem