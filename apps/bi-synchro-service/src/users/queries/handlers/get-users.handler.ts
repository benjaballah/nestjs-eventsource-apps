import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Redisk } from 'redisk';
import { GetUsersQuery } from '../impl';
import { User } from '@synchro/users/entities/user.entity';
import { Logger } from '@nestjs/common';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  private logger = new Logger('GetUsersHandler');

  constructor(private readonly redisk: Redisk) {}

  async execute(query: GetUsersQuery) {
    this.logger.verbose('execute');
    return await this.redisk.list<User>(User);
  }
}
