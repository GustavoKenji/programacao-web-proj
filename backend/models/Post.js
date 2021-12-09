const database = require('../database/index');

class Post{
	constructor() {
		this.collection = 'posts';
	}

	async connect() {
		const db = await database.connectMongo();
		return db.collection(this.collection);
	}

	async find() {
		try {
			let posts = await this.connect();
			return posts.find().sort({title: 1}).toArray();
		} catch (error) {
			throw new Error(error);
		}
	}

	async createPost(req) {
		try {
			const post = await this.connect();
			return await post.insertOne(req);
		} catch (error) {
			throw new Error(error);
		}
	}

	async deletePost(req) {
		try {
			const post = await this.connect();
			console.log(req)
			return await post.deleteOne(req);
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = Post;