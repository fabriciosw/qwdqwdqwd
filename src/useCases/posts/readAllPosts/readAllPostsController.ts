import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import { GetCustomPostRepository } from '../../../database/repositories/implementations/post.repository';
import ApiError from '../../../utils/apiError.utils';
import IController from '../../IController';
import ReadAllPostsUseCase from './readAllPostsUseCase';

export default class ReadAllPostsController implements IController {
  constructor(private useCase: ReadAllPostsUseCase) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const posts = await this.useCase.execute(
        getCustomRepository as GetCustomPostRepository
      );

      return response.status(StatusCodes.OK).json({ posts });
    } catch (error: any) {
      if (error instanceof ApiError) return next(error);

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `ReadAllPostsController: ${error.message}`
      );
    }
  }
}
