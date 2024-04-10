import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { Repository } from "typeorm";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>

  constructor() { }

  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());
    return entities.map((item) => AlarmMapper.toDomain(item));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistanceModel = AlarmMapper.toPersistance(alarm);
    this.alarms.set(persistanceModel.id, persistanceModel)

    const newEntity = this.alarms.get(persistanceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
}
