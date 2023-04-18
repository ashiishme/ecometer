import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";

@Entity()
export class EnergyReading {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  serialNumber!: string;

  @Column()
  type!: string;

  @Column()
  reading!: number;

  @Column()
  zip!: number;

  @Column()
  city!: string;

  @ManyToOne(() => User, (user) => user.energyReadings)
  user!: User;
}
