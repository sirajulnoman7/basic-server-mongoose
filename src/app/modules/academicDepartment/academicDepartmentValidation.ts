import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic department must me string',
    }),
    academicFaculty: z.string({
      required_error: 'faculty must be needed',
    }),
  }),
});
const academicDepartmentUpdateValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic department must me string',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'faculty must be needed',
      })
      .optional(),
  }),
});

export const academicDepartmentValidation = {
  academicDepartmentValidationSchema,
  academicDepartmentUpdateValidationSchema,
};
