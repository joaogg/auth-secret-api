import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { getRepository } from "typeorm";
import AccessToken from '../../entity/AccessToken/AccessToken';

@EntityRepository(AccessToken)
class AccessTokenDAO extends Repository<AccessToken> {

    public static async create(accessToken: AccessToken): Promise<AccessToken | AccessToken[] | undefined> {
        try {
            const createAccessToken = await getRepository(AccessToken).save(accessToken);

            return createAccessToken;
        } catch (error) {
            return undefined;
        }
    }

    public static async update(accessToken: AccessToken): Promise<AccessToken | AccessToken[] | undefined> {
        try {
            const updateAccessToken = await getRepository(AccessToken).save(accessToken);

            return updateAccessToken;
        } catch (error) {
            return undefined;
        }
    }

    public static async deleteById(id: string): Promise<DeleteResult | undefined> {
        const accessToken = await getRepository(AccessToken).delete(id);

        return accessToken;
    }

    public static async findAll(): Promise<AccessToken | AccessToken[] | undefined> {
        try {
            const accessToken = await getRepository(AccessToken).find();

            return accessToken;
        } catch (error) {
            return undefined;
        }
    }

    public static async findByToken(token: string): Promise<AccessToken | undefined> {
        try {
            const accessToken = await getRepository(AccessToken).findOne({
                where: {
                    token,
                },
            });

            return accessToken;
        } catch (error) {
            return undefined;
        }
    }
}

export default AccessTokenDAO;