import dataSource from "../database/config";
import { User } from "../domain/User";

export class UserRepository {
  public async create(user: User): Promise<User> {
    const createdUser = await dataSource.getRepository(User).save(user);
    return createdUser;
  }
}
