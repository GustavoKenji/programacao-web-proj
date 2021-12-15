const { MongoClient } = require('mongodb');
const { mongoURL, dbName } = require('../config');

const client = new MongoClient(mongoURL);

async function connectMongo() {
    try {
        await client.connect();
        console.info('Conexão com o banco realizada ...');
        return client.db(dbName);
    } catch (error) {
        throw new Error(error);
    }
}

async function closeMongo(db) {
    try {
        console.info('Fechando conexão com o mongodb ...');
        db.close();
        console.info('Conexão com o mangodb finalizada ...');
        return;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    connectMongo,
    closeMongo
};