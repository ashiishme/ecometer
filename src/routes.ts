import { Controller } from "./controllers/Controller";
import { GetFormController } from "./controllers/GetFormController";
import { SubmitFormController } from "./controllers/SubmitFormController";

export type Route = {
  method: "post" | "get" | "patch" | "put" | "delete";
  path: string;
  controller: new () => Controller;
};

export const routes: Route[] = [
  {
    path: "/forms/:formName",
    method: "get",
    controller: GetFormController,
  },
  {
    path: "/forms/:formName/submit",
    method: "post",
    controller: SubmitFormController,
  },
];
