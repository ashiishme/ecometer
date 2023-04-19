import { Request, Response } from "express";
import { User } from "../domain/User";
import { UserRepository } from "../repositories/UserRepository";
import { Controller } from "./Controller";
import formStructure from "../forms/formStructure";
import { EnergyReadingRepository } from "../repositories/EnergyReadingRepository";
import { EnergyReading } from "../domain/EnergyReading";

type RequestParamsProps = {
  formName: string;
};
type RequestBodyProps = {
  energyInfo: Record<string, unknown>;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
};

export class SubmitFormController implements Controller {
  constructor(
    private userRepository = new UserRepository(),
    private energyReadingRepository = new EnergyReadingRepository(),
  ) {}

  async handle(
    req: Request<RequestParamsProps, {}, RequestBodyProps>,
    res: Response,
  ): Promise<void> {
    const { energyInfo, user } = req.body;
    const { formName } = req.params;

    if (!formName) {
      res.status(400).json({ message: "Invalid form name provided" });
      return;
    }

    const existingForm = formStructure[formName];

    if (!existingForm) {
      res.status(404).json({ message: "Form doesn't exists" });
      return;
    }

    const schema = formStructure[formName].validationSchema;
    await schema.validate({ ...energyInfo, user });

    const createdUser = await this.userRepository.create({
      ...new User(),
      ...user,
    });
    if (createdUser) {
      await this.energyReadingRepository.create({
        ...new EnergyReading(),
        ...energyInfo,
        userId: createdUser.id,
      });
    }

    res.status(200).json({ message: "Successfully submitted" });
  }
}
