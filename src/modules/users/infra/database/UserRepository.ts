import { UserModel as client } from "@infra/database/models/users/UsersModel";
import { User } from "@modules/users/domain/User";
import { IFilter, IUpdateProps, IUserRepo } from "@modules/users/repositories/IUserRepo";
import { UserMap } from "../mapper/UserMap";

class UserRepository implements IUserRepo {
  async findAll(): Promise<(User | undefined)[]> {
    const users = await client.find();
    return users.map((user) => UserMap.toDomain(user));
  }

  async findById(userId: string): Promise<User | undefined> {
    if (userId.length !== 24) {
      return;
    }
    const user = await client.findOne({ _id: userId });
    if (!user) {
      return;
    }
    return UserMap.toDomain(user);
  }


  async create(user: User): Promise<void> {
    const data = await UserMap.toPersistence(user);
    await client.create(data);
  }

  async update(id: string, userData: IUpdateProps) {
    const user = await client.findOneAndUpdate(
      { _id: id },
      userData,
    ).orFail();
  }

  async findByFilter(filter: IFilter): Promise<(User | undefined)[]> {
    const users = await client.find(filter);
    return users.map((user) => UserMap.toDomain(user));
  }

}

export default UserRepository;