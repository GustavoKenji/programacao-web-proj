const database = require('../database/index');
const User = require('../models/User');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
class UserController {
    constructor() {
        this.collectionName = 'users';
        this.UserModel = new User();
    }

    async index(request, response) {
        try {
            let users = await this.UserModel.find();
            return response.status(200).json(users);
        } catch (error) {
            throw new Error(error);
        }
    }

    async create(request, response) {
        try {
            const { body } = request;
            const { username } = body;
            let user = await this.UserModel.findOne({ username: username });
            if (!user) {
                let salt = genSaltSync();
                let password = hashSync(body.password, salt);
								let acl = body.acl ? "admin" : "";
                console.log('criar usuario ...');
                user = await this.UserModel.insertOne({ username: username, password: password, acl });
                return response.json(user);
            } else {
                return response.status(409).json({
                    error: 'Já existe um usuário com esse username.'
                });
            }
        } catch (error) {
            new Error(error);
        }
    }

}

module.exports = new UserController();