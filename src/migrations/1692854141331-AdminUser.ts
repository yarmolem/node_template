import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdminUser1692854141331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO public.users
            ("email","name","lastname","password","rol") VALUES
            (
                'admin@dev.com',
                'admin',
                'admin',
                '$argon2id$v=19$m=65536,t=3,p=4$vL2n2t/oYD0I4ZhHI6kh1A$Ud1TuNqwCoH3cYze5LLD5X+peXcVzWPXbJ8syWiGO9c',
                'ADMIN'::public."users_rol_enum"
            );`
    )
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
