import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { getRepository } from "typeorm";
import User from '../../entity/User/User';

@EntityRepository(User)
class UserDAO extends Repository<User> {

    public static async create(user: User): Promise<User | User[] | undefined> {
        try {
            const createUser = await getRepository(User).save(user);

            return createUser;
        } catch (error) {
            return undefined;
        }
    }

    public static async update(user: User): Promise<User | User[] | undefined> {
        try {
            const updateUser = await getRepository(User).save(user);

            return updateUser;
        } catch (error) {
            return undefined;
        }
    }

    public static async deleteById(id: string): Promise<DeleteResult | undefined> {
        const user = await getRepository(User).delete(id);

        return user;
    }

    public static async findAll(): Promise<User | User[] | undefined> {
        try {
            const user = await getRepository(User).find({
                select: ["id", "username", "role"]
            });

            return user;
        } catch (error) {
            return undefined;
        }
    }

    public static async findById(id: string): Promise<User | undefined> {
        try {
            const user = await getRepository(User).findOne({
                select: ["id", "username", "role"],
                where: {
                    id,
                },
            });

            return user;
        } catch (error) {
            return undefined;
        }
    }

    public static async findByUsername(username: string): Promise<User | undefined> {
        try {
            const user = await getRepository(User).findOne({
                where: {
                    username,
                },
            });

            return user;
        } catch (error) {
            return undefined;
        }
    }
}

export default UserDAO;