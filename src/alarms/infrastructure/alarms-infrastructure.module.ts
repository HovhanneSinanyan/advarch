import { Module } from "@nestjs/common";
import { OrmAlarmPersistanceModule } from "./persistance/orm/orm-persistance.module";
import { InMemoryAlarmPersistanceModule } from "./persistance/in-memory/in-memory-persistance.module";

@Module({})
export class AlarmsInfrastructureModule {
    static use(driver: 'orm' | 'in-memory') {
        const persistanceModule = 
            driver === 'orm'
                ? OrmAlarmPersistanceModule
                : InMemoryAlarmPersistanceModule;

        return {
            module: AlarmsInfrastructureModule,
            imports: [persistanceModule],
            exports: [persistanceModule],
        };
    }
}