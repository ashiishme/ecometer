import dataSource from "../database/config";
import { EnergyReading } from "../domain/EnergyReading";
import { EnergyReadingRepository } from "./EnergyReadingRepository";

jest.mock("../database/config");

describe("UserRepository", () => {
  let energyReadingRepository: EnergyReadingRepository;

  beforeAll(() => {
    energyReadingRepository = new EnergyReadingRepository();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new energy reading", async () => {
    const mockSave = jest.fn();
    const mockRepository = { save: mockSave };
    (dataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    const energyData = {};
    await energyReadingRepository.create(energyData as any);

    expect(dataSource.getRepository).toHaveBeenCalledWith(EnergyReading);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith(energyData);
  });
});
