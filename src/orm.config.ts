import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig() : TypeOrmModuleOptions {
    const commonConf = {
        SYNCHRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    }

    const ormconfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 13306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: commonConf.ENTITIES,
        synchronize: commonConf.SYNCHRONIZE,
        logging: true,
    };

    return ormconfig;
}

export { ormConfig }