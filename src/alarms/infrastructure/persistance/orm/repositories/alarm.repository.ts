import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { Repository } from "typeorm";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";

@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) { }

  async findAll(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find();
    return entities.map((item) => AlarmMapper.toDomain(item));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const peristanceModel = AlarmMapper.toPersistance(alarm);
    const newEntity = await this.alarmRepository.save(peristanceModel);
    return AlarmMapper.toDomain(newEntity);
  }
}
