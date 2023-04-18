import dataSource from "../database/config";
import { EnergyReading } from "../domain/EnergyReading";

export class EnergyReadingRepository {
  public async create(energyReading: EnergyReading): Promise<void> {
    await dataSource.getRepository(EnergyReading).save(energyReading);
  }
}
