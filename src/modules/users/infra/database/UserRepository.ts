import { UserModel as client } from "@infra/database/models/users/UsersModel";
import { User } from "@modules/users/domain/User";
import { IFilter, IUpdateProps, IUserRepo } from "@modules/users/repositories/IUserRepo";
import { UserMap } from "../mapper/UserMap";

class UserRepository implements IUserRepo {
  async findAll(): Promise<User[]> {
    const users = await client.find();
    const result = users.map((user) => UserMap.toDomain(user));
    return result.filter((u) => u) as unknown as User[];
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

  async remove(id: string) {
    const user = await client.findOneAndRemove(
      { _id: id },
    ).orFail();
  }

  async findByFilter(filter: IFilter): Promise<User[]> {
    const users = await client.find(filter);
    const result = users.map((user) => UserMap.toDomain(user));
    return result.filter((u) => u) as unknown as User[];
  }

}

export default UserRepository;