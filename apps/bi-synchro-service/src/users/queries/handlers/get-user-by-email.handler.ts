import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../impl';
import { Redisk } from 'redisk';
import { User } from '@synchro/users/entities/user.entity';
import { Logger } from '@nestjs/common';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  private logger = new Logger('GetUsersHandler');
  constructor(private readonly redisk: Redisk) {}

  async execute(query: GetUserByEmailQuery) {
    return await this.redisk.getOne<User>(User, query.email, 'email');
  }
}
