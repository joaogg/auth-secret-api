import { MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdminUser1644114349616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // let user = new User();
        // user.username = "admin";
        // user.password = "admin";
        // user.hashPassword();
        // user.role = "ADMIN";
        // const userRepository = getRepository(User);
        // await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
