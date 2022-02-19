import { Request, Response } from "express";
import { validate } from "class-validator";

import User from "../../entity/User/User";
import AppError from "../../app/error/AppError";
import AppSuccess from "../../app/success/AppSuccess";

import UserDAO from '../../model/User/UserDAO';


class UserController {

  public static getAll = async (req: Request, res: Response) => {

    // Procura os dados na tabela User
    const users = await UserDAO.findAll();

    if (!users) {
      const err = new AppError('Ocorreu um erro ao consultar os usuários. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Envia os dados e o status da API REST
    const success = new AppSuccess('Usuários listados com sucesso!', 200, users);

    return res
      .status(200)
      .send(success);
  };

  public static getOneById = async (req: Request, res: Response) => {
    // Pega o id na requisição
    const userId: string = req.params.id;

    // Procura os dados na tabela User
    const users = await UserDAO.findById(userId);

    if (!users) {
      const err = new AppError('Ocorreu um erro ao consultar este usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Envia os dados e o status da API REST
    const success = new AppSuccess('Usuário listado com sucesso!', 200, [users]);

    // Envia os dados e o status da API REST
    return res
      .status(200)
      .send(success);
  };

  public static createUser = async (req: Request, res: Response) => {
    // Parâmetros no corpo da requisição
    let { username, password, role } = req.body;

    let user = new User();

    user.username = username;
    user.password = password;
    user.role = role;

    // Validando os parâmetros
    const errors = await validate(user);

    if (errors.length > 0) {
      return res
        .status(400)
        .send(errors);
    }

    // Faz a senha do usuário
    user.hashPassword();

    // Procura os dados na tabela User
    const users = await UserDAO.create(user);

    if (!users) {
      const err = new AppError('Ocorreu um erro ao criar o usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Envia os dados e o status da API REST
    const success = new AppSuccess('Usuário criado com sucesso!', 201, []);

    // Usuário criado
    return res
      .status(201)
      .send(success);
  };

  public static editUser = async (req: Request, res: Response) => {
    // Parâmetros no corpo da requisição
    const userId = req.params.id;

    const { username, role } = req.body;

    // Procura os dados na tabela User
    const user = await UserDAO.findById(userId);


    if (!user) {
      const err = new AppError('Ocorreu um erro ao consultar este usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }


    user.username = username;
    user.role = role;

    // Procura os dados na tabela User
    const users = await UserDAO.update(user);

    if (!users) {
      const err = new AppError('Ocorreu um erro ao atualizar o usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Envia os dados e o status da API REST
    const success = new AppSuccess('Usuário atualizado com sucesso!', 201, []);

    // Usuário criado
    return res
      .status(201)
      .send(success);

  };

  public static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const userId = req.params.id;

    // Procura os dados na tabela User
    const user = await UserDAO.findById(userId);


    if (!user) {
      const err = new AppError('Ocorreu um erro ao consultar este usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Deleta o usuário desejado
    await UserDAO.deleteById(userId);

    // Envia os dados e o status da API REST
    const success = new AppSuccess('Usuário excluido com sucesso!', 201, []);

    // Usuário deletado
    return res
      .status(201)
      .send(success);

  };
};

export default UserController;