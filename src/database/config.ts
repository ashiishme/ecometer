import { DataSource } from "typeorm";
import { EnergyReading } from "../domain/EnergyReading";
import { User } from "../domain/User";
import { getEnv } from "../getEnv";

const dataSource = new DataSource({
  type: "postgres",
  host: getEnv("POSTGRES_DB_HOST"),
  port: Number(getEnv("POSTGRES_DB_PORT")),
  username: getEnv("POSTGRES_DB_USER"),
  password: getEnv("POSTGRES_DB_PASSWORD"),
  database: getEnv("POSTGRES_DB_NAME"),
  entities: [User, EnergyReading],
  synchronize: true,
});

export default dataSource;
