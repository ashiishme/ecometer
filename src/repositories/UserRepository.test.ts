import dataSource from "../database/config";
import { User } from "../domain/User";
import { UserRepository } from "./UserRepository";

jest.mock("../database/config");

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new user", async () => {
    const mockSave = jest.fn();
    const mockRepository = { save: mockSave };
    (dataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    const user = {
      firstName: "Ashish",
      lastName: "Yadav",
      email: "asdasd@dasd.com",
      phoneNumber: "1234567",
    };
    await userRepository.create(user as any);

    expect(dataSource.getRepository).toHaveBeenCalledWith(User);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith(user);
  });
});
