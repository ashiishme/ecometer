import * as yup from "yup";

const validationSchema = yup.object().shape({
  buildingType: yup.string().required(),
  numberOfResidential: yup.number().required(),
  type: yup.string().required(),
  reading: yup.string().required(),
  zip: yup.string().required(),
  city: yup.string().required(),
  user: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    phoneNumber: yup.string().required(),
  }),
  termsAndConditions: yup.boolean().required(),
});

const energyConsumptionForm = {
  structure: {
    steps: [
      {
        title: "Building Type",
        fields: [
          {
            type: "radio",
            name: "buildingType",
            options: [
              {
                label: "Residential",
                value: "residential",
              },
              {
                label: "Commercial",
                value: "commercial",
              },
            ],
          },
        ],
      },
      {
        title: "Number of Residential",
        fields: [
          {
            type: "number",
            name: "numberOfResidential",
            placeholder: "Enter number of residential units",
          },
        ],
      },
      {
        title: "Meter Reading",
        fields: [
          {
            type: "radio",
            name: "type",
            options: [
              {
                label: "Electricity",
                value: "electricity",
              },
              {
                label: "Gas",
                value: "gas",
              },
            ],
          },
          {
            type: "text",
            name: "reading",
            placeholder: "Enter energy reading",
          },
        ],
      },
      {
        title: "Addresses",
        fields: [
          {
            type: "text",
            name: "zipCode",
            placeholder: "Enter zip code",
          },
          {
            type: "text",
            name: "city",
            placeholder: "Enter city name",
          },
        ],
      },
      {
        title: "User Details",
        fields: [
          {
            type: "text",
            name: "firstName",
            placeholder: "Enter your first name",
          },
          {
            type: "text",
            name: "lastName",
            placeholder: "Enter your last name",
          },
          {
            type: "text",
            name: "email",
            placeholder: "Enter email address",
          },
          {
            type: "text",
            name: "phoneNumber",
            placeholder: "Enter phone number",
          },
          {
            type: "checkbox",
            name: "termsAndConditions",
            label: "I agree to the terms and conditions",
          },
        ],
      },
    ],
  },
  validationSchema: validationSchema,
};

export default energyConsumptionForm;
