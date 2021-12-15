const database = require('../database/index');

class Color{
	constructor() {
		this.collection = 'colors';
	}

	async connect() {
		const db = await database.connectMongo();
		return db.collection(this.collection);
	}

	async getAllColors() {
		try {
			const colors = await this.connect();
			return await colors.find({}).toArray();
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Color;