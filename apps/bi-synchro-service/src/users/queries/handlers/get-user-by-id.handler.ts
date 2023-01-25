import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../impl';
import { Redisk } from 'redisk';
import { User } from '@synchro/users/entities/user.entity';
import { Logger } from '@nestjs/common';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  private logger = new Logger('GetUsersHandler');
  constructor(private readonly redisk: Redisk) {}

  async execute(query: GetUserByIdQuery) {
    this.logger.verbose('execute');
    return await this.redisk.getOne<User>(User, query.id);
  }
}
