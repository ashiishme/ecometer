import { Request, Response } from "express";
import { Controller } from "./Controller";
import formStructure from "../forms/formStructure";

type RequestFormProps = {
  formName: string;
};

export class GetFormController implements Controller {
  constructor() {}

  async handle(req: Request<RequestFormProps>, res: Response): Promise<void> {
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

    res.status(200).json(existingForm.structure);
  }
}
