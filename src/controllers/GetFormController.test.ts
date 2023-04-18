import { Request, Response } from "express";
import formStructure from "../forms/formStructure";
import { GetFormController } from "./GetFormController";

describe("GetFormController", () => {
  it("should return 400 error if invalid form name is provided", async () => {
    const controller = new GetFormController();

    const request = { params: { formName: "" } } as Request<
      { formName: string },
      {},
      any
    >;

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
    const controller = new GetFormController();

    const request = { params: { formName: "asdasdad" } } as Request<
      { formName: string },
      {},
      any
    >;

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

  it("should return 200 with the requested form structure", async () => {
    const controller = new GetFormController();

    const request = { params: { formName: "energyConsumption" } } as Request<
      { formName: string },
      {},
      any
    >;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response<any>;

    await controller.handle(request, response);

    const structure = formStructure["energyConsumption"].structure;

    expect(response.json).toHaveBeenCalledWith(structure);
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
