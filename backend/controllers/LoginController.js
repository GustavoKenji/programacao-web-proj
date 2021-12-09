const { compareSync } = require("bcryptjs");
const User = require("../models/User");
const Session = require("../models/Session");

class LoginController {
  constructor() {
    this.UserModel = new User();
    this.SessionModel = new Session();
  }

  async login(request, response) {
    try {
      const { body, sessionID } = request;
      let user = await this.UserModel.findOne({ username: body.username });
      if (user) {
				let verifySession = await this.SessionModel.consultSession({ username: body.username });
				if(verifySession === null || verifySession === undefined) {
					if (compareSync(body.password, user.password)) {
						let session = await this.SessionModel.createSession({
							username: body.username,
							session: sessionID,
						});
						return response.status(200).json({ user, sessionID });
					} else {
						return response.status(401).json({ error: "Não autorizado" });
					}
				} else {
					return response.status(409).json({ error: "Usuário já está logado na plataforma" });
				}
      } else {
        return response.status(400).json({ error: "Usuário não existe" });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout(request, response) {
		try {
			const { body } = request;
			const { sessionID } = body;
			let deletedSession = await this.SessionModel.endSession({ session: sessionID });
			return response.status(200).json( deletedSession );
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = new LoginController();
