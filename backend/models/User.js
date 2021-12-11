const database = require('../database/index');

class User {
    constructor() {
        this.collection = 'users';
    };

    async connect() {
        const db = await database.connectMongo();
        return db.collection(this.collection);
    }

    async find() {
        try {
            const users = await this.connect();
            return await users.find().sort({username: 1}).toArray();
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(req) {
        try {
            const users = await this.connect();
            return await users.findOne(req);
        } catch (error) {
            throw new Error(error);
        }
    }

    async insertOne(req) {
        try {
            const users = await this.connect();
            return users.insertOne(req);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = User;