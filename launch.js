/**
 * Arquivo de pré configuração do banco de dados, irá inserir os dados
 * dentro do banco a partir do arquivo dados.json na pasta raíz do projeto
 */
const fs = require('fs');
const { exit } = require('process');
const database = require('./database/index');

async function main() {
    let documents = undefined;
    fs.readFile('./dados.json', 'utf-8', (err, data) => {
        if (err) {
            throw new Error(err);
        } else {
            documents = JSON.parse(data);
        }
    });
    const db = await database.connectMongo();
    console.info('criando a tabela de colors ...');
    const colors = db.collection('colors');
    console.info('tabela colors criada com sucesso ...');
    console.info('verificando se existem documentos guardados na tabela colors ...')
    let ncolors = await colors.countDocuments();
    if (ncolors !== 0) {
        console.info('Existem ', ncolors, ' registrados na tabela colors ...');
    } else {
        console.info('inserindo os valores de cores na tabela colors ...');
        await colors.insertMany(documents);
        console.info('documentos inseridos com sucesso ...');
    }
    console.info('Fechando conexão com o banco ...');
    //await database.closeMongo(db);
    console.info('Encerrando processo.');
    exit(0);
}

main();
