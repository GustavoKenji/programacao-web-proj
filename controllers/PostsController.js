const { ObjectId } = require('mongodb');
const database = require('../database/index');
const Post = require('../models/Post');

class PostsController {
	constructor() {
		this.PostsModel = new Post();
	}

	async createPost(request, response) {
		try {
			const { body } = request;
			const { title, text } = body;
			console.info('criando um post ...');
			let post = await this.PostsModel.createPost({ title: title, text: text });
			return response.status(200).json(post);
		} catch (error) {
			new Error(error);
		}
	}

	async deletePost(request, response) {
		try {
			const{ id } = request.query;
			let deletedPost = await this.PostsModel.deletePost({_id: ObjectId(id)});
			 return response.status(200).json(deletedPost);
		} catch (error) {
			throw new Error(error);
		}
	}

	async index(request, response) {
		try {
			let posts = await this.PostsModel.find();
			return response.status(200).json(posts);
		} catch (error) {
			throw new Error(error);
		}
	}

	async searchPost(request, response) {
		try {
			const { body } = request;
			const { title } = body;
			let posts = await this.PostsModel.findOne({ title: title });
			return response.status(200).json(posts);
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = new PostsController();