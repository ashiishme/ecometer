import { Request, Response } from "express";
import { EnergyReadingRepository } from "../repositories/EnergyReadingRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SubmitFormController } from "./SubmitFormController";

const mockUserRepository = {
  create: jest.fn(),
};
const mockEnergyReadingRepository = {
  create: jest.fn(),
};

describe("SubmitFormController", () => {
  it("should return 400 error if invalid form name is provided", async () => {
    const controller = new SubmitFormController(
      mockUserRepository as UserRepository,
      mockEnergyReadingRepository as EnergyReadingRepository,
    );

    const request = {
      body: {
        energyInfo: {
          buildingType: "residential",
          numberOfResidential: 1,
          serialNumber: "123456",
          type: "gas",
          reading: 100,
          zip: 12345,
          city: "New York",
          termsAndConditions: true,
        },
        user: {
          firstName: "Ashish",
          lastName: "Yadav",
          email: "adsadas@example.com",
          phoneNumber: "1234567890",
        },
      },
      params: {
        formName: "",
      },
    } as Request<any, {}, any>;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response<any>;

    await controller.handle(request, response);

    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid form name provided",
    });
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("should return 404 error if provided form not found", async () => {
    const controller = new SubmitFormController(
      mockUserRepository as UserRepository,
      mockEnergyReadingRepository as EnergyReadingRepository,
    );

    const request = {
      body: {
        energyInfo: {
          buildingType: "residential",
          numberOfResidential: 1,
          serialNumber: "123456",
          type: "gas",
          reading: 100,
          zip: 12345,
          city: "New York",
          termsAndConditions: true,
        },
        user: {
          firstName: "Ashish",
          lastName: "Yadav",
          email: "adsadas@example.com",
          phoneNumber: "1234567890",
        },
      },
      params: {
        formName: "randomForm",
      },
    } as Request<any, {}, any>;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response<any>;

    await controller.handle(request, response);

    expect(response.json).toHaveBeenCalledWith({
      message: "Form doesn't exists",
    });
    expect(response.status).toHaveBeenCalledWith(404);
  });

  it("should return 200 by creating user and energy reading data", async () => {
    const controller = new SubmitFormController(
      mockUserRepository as UserRepository,
      mockEnergyReadingRepository as EnergyReadingRepository,
    );

    const request = {
      body: {
        energyInfo: {
          buildingType: "residential",
          numberOfResidential: 1,
          serialNumber: "123456",
          type: "gas",
          reading: 100,
          zip: 12345,
          city: "Berlin",
          termsAndConditions: true,
        },
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          phoneNumber: "1234567890",
        },
      },
      params: {
        formName: "energyConsumption",
      },
    } as Request<any, {}, any>;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response<any>;

    await controller.handle(request, response);

    expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    expect(mockEnergyReadingRepository.create).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: "Successfully submitted",
    });
  });
});
