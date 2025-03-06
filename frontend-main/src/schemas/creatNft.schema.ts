import { array, number, object, string } from 'yup';

export const createNftForm1Schema = object({
  category: string().required(),
  theme: string().when('category', {
    is: (category) => category === '육필 시',
    then: (s) => s.required(),
    otherwise: (s) => s.nullable(),
  }),
  attributes: array()
    .of(
      object({
        key: string().required(),
        value: string().required(),
      }),
    )
    .nullable(),
});

export const createNftForm2Schema = object({
  name: string().required(),
  description: string().required(),
  amount: string().required(),
  detail: object({
    text: string().nullable(),
    image: string().nullable(),
  })
    .required()
    .test(
      'description',
      'text 또는 image 중 하나는 반드시 있어야 합니다.',
      (description) => {
        return Boolean(description?.text) || Boolean(description?.image);
      },
    ),
  covers: array().of(string()).min(1).required(),
});

export const createNftForm2SchemaNotAmount = object({
  name: string().required(),
  description: string().required(),
  detail: object({
    text: string().nullable(),
    image: string().nullable(),
  })
    .required()
    .test(
      'description',
      'text 또는 image 중 하나는 반드시 있어야 합니다.',
      (description) => {
        return Boolean(description?.text) || Boolean(description?.image);
      },
    ),
  covers: array().of(string()).min(1).required(),
});

export const createNftForm3Schema = object({
  pages: array().of(string()).min(1).required(),
});

export const createNftForm4Schema = object({
  price: number().required(),
  royalty: number().min(0).max(15).required(),
});
