import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EnergyReading } from "./EnergyReading";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @OneToMany(() => EnergyReading, (energyReading) => energyReading.user)
  energyReadings!: EnergyReading[];
}
