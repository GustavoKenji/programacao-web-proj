const database = require('../database/index');

class Session {
	constructor() {
		this.collection = 'session';
	}

	async connect() {
		const db = await database.connectMongo();
		return db.collection(this.collection);
	}

	async consultSession(req) {
		try {
			const session = await this.connect();
			return await session.findOne(req);
		} catch (error) {
			
		}
	}

	async createSession(req) {
		try {
			const session = await this.connect();
			return await session.insertOne(req);
		} catch (error) {
			throw new Error(error);
		}
	}

	async endSession(req) {
		try {
			const session = await this.connect();
			return await session.deleteOne(req);
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Session;