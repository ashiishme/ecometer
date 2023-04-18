import { ObjectSchema } from "yup";
import energyConsumptionForm from "./energyReadingForm";

type FormItem = {
  structure: Record<string, unknown>;
  validationSchema: ObjectSchema<Record<string, unknown>>;
};

type FormStructureProps = {
  [name: string]: FormItem;
};

const formStructure: FormStructureProps = {
  energyConsumption: energyConsumptionForm,
};

export default formStructure;
