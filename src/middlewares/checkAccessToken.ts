import { Request, Response, NextFunction } from "express";
import AppError from "../app/error/AppError";
import AccessTokenDAO from "../model/UserAccesss/UserAccessDAO";

const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  // Procura pelo parâmetro token
  const token = req.query.token || '';

  // Procura os dados na tabela User
  const accessToken = await AccessTokenDAO.findByToken(token);

  if (!accessToken) {
    const err = new AppError('Token inválido!');

    return res
      .status(400)
      .send(err);
  }

  next();
};

export default checkAccessToken;