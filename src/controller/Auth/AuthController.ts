import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import User from "../../entity/User/User";
import config from "../../config/config";
import AppError from "../../app/error/AppError";
import UserDAO from "../../model/User/UserDAO";
import AppSuccess from "../../app/success/AppSuccess";

export default class AuthController {
  public static async login(req: Request, res: Response): Promise<Response> {
    // Pega os dados de login enviados no corpo da requisição
    let { username, password } = req.body;

    if (!(username && password)) {
      const err = new AppError('Preencha os campos e-mail e senha e tente novamente!');

      return res
        .status(400)
        .send(err);
    }

    // Procura os dados na tabela User
    const user = await UserDAO.findByUsername(username);

    if (!user) {
      const err = new AppError('E-mail ou senha estão incorretos!');

      return res
        .status(401)
        .send(err);
    }

    // Verifica se a senha confere
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      const err = new AppError('E-mail ou senha estão incorretos!');

      return res
        .status(401)
        .send(err);
    }

    // Login com o token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "6h" }
    );

    // Envia os dados e o status da API REST
    const success = new AppSuccess('Login efetuado com sucesso!', 200, [{ 'token': token }]);

    // Envia os dados e o status da API REST
    return res
      .status(200)
      .send(success);
  };

  public static async changePassword(req: Request, res: Response): Promise<Response> {
    // Pegando o id do usuário através do token JWT
    const userId = res.locals.jwtPayload.userId;

    // Pegando as variáveis no corpo da requisição
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      const err = new AppError('Preencha os campos senha atual e nova senha!');

      return res
        .status(400)
        .send(err);
    }

    // Procura os dados na tabela User
    const user = await UserDAO.findById(userId);

    if (!user) {
      const err = new AppError('Por favor, faça login novamente!');

      return res
        .status(401)
        .send(err);
    }

    // Verifica se a senha confere com a senha no banco
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      const err = new AppError('Senha atual incorreta!');

      return res
        .status(401)
        .send(err);
    }

    // Modifica a senha atual do usuário
    user.password = newPassword;

    const errors = await validate(user);

    if (errors.length > 0) {
      const err = new AppError('Nova senha inválida!');

      return res
        .status(400)
        .send(err);
    }

    // Criptorafa a nova senha
    user.hashPassword();

    // Atualiza os dados do usuário
    const users = await UserDAO.update(user);

    if (!users) {
      const err = new AppError('Ocorreu um erro ao atualizar o usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Envia os dados e o status da API REST
    const success = new AppSuccess('Senha atualizada com sucesso!', 204, []);

    // Senha alterada
    return res
      .status(204)
      .send(success);
  };
}