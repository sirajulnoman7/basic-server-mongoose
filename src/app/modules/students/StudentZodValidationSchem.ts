import { date, z } from 'zod';

// Name Schema
const nameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters'), // Use max as a method
  middleName: z
    .string()
    .min(1, 'Middle name is required')
    .max(50, 'Middle name must not exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters'),
});

// Guardant Schema
const guardantSchema = z.object({
  fatherName: z
    .string()
    .min(1, "Father's name is required")
    .max(100, "Father's name must not exceed 100 characters"),
  fatherOccupation: z
    .string()
    .max(100, "Father's occupation must not exceed 100 characters"),
  fatherContactNo: z
    .string()
    .max(15, "Father's contact number must not exceed 15 digits"),
  motherName: z
    .string()
    .min(1, "Mother's name is required")
    .max(100, "Mother's name must not exceed 100 characters"),
  motherOccupation: z
    .string()

    .max(100, "Mother's occupation must not exceed 100 characters"),
  motherContactNo: z
    .string()

    .max(15, "Mother's contact number must not exceed 15 digits"),
});

// LocalGuardant Schema
const localGuardantSchema = z.object({
  name: z
    .string()
    .min(1, 'Local guardant name is required')
    .max(100, 'Local guardant name must not exceed 100 characters'),
  contactNo: z
    .string()

    .max(15, 'Contact number must not exceed 15 digits'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(200, 'Address must not exceed 200 characters'),
});

// Students Schema
const studentSchemaValidationZod = z.object({
  body: z.object({
    password: z.string().optional(),
    studentData: z.object({
      age: z
        .number()
        .int()
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must not exceed 120'),
      name: nameSchema,
      address: z
        .string()
        .min(1, 'Address is required')
        .max(200, 'Address must not exceed 200 characters'),
      email: z.string().email('Email must be a valid email address'),
      contactNo: z.string().max(15, 'Contact number must not exceed 15 digits'),
      dateOfBirth: z.date().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }), // Fixed enum validation
      emergenceContactNo: z
        .string()
        .max(15, 'Emergency contact number must not exceed 15 digits')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),

      presentAddress: z
        .string()
        .min(1, 'Present address is required')
        .max(200, 'Present address must not exceed 200 characters'),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required')
        .max(200, 'Permanent address must not exceed 200 characters'),
      guardant: guardantSchema,
      localGuardant: localGuardantSchema,
    }),
  }),
});

// Name Schema update------------------------------------
// -----------------------------------------------------
const nameSchemaUpdate = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .optional(), // Use max as a method
  middleName: z
    .string()
    .min(1, 'Middle name is required')
    .max(50, 'Middle name must not exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
    .optional(),
});

// Guardant Schema
const guardantSchemaUpdate = z.object({
  fatherName: z
    .string()
    .min(1, "Father's name is required")
    .max(100, "Father's name must not exceed 100 characters")
    .optional(),
  fatherOccupation: z
    .string()
    .max(100, "Father's occupation must not exceed 100 characters")
    .optional(),
  fatherContactNo: z
    .string()
    .max(15, "Father's contact number must not exceed 15 digits")
    .optional(),
  motherName: z
    .string()
    .min(1, "Mother's name is required")
    .max(100, "Mother's name must not exceed 100 characters")
    .optional(),
  motherOccupation: z
    .string()
    .max(100, "Mother's occupation must not exceed 100 characters")
    .optional(),
  motherContactNo: z
    .string()
    .max(15, "Mother's contact number must not exceed 15 digits")
    .optional(),
});

// LocalGuardant Schema
const localGuardantSchemaUpdate = z.object({
  name: z
    .string()
    .min(1, 'Local guardant name is required')
    .max(100, 'Local guardant name must not exceed 100 characters')
    .optional(),
  contactNo: z
    .string()
    .max(15, 'Contact number must not exceed 15 digits')
    .optional(),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(200, 'Address must not exceed 200 characters')
    .optional(),
});

// Students Schema
export const updateStudentValidationSchema = z.object({
  body: z.object({
    studentData: z.object({
      age: z
        .number()
        .int()
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must not exceed 120')
        .optional(),
      name: nameSchemaUpdate.optional(),
      address: z
        .string()
        .min(1, 'Address is required')
        .max(200, 'Address must not exceed 200 characters')
        .optional(),
      email: z.string().email('Email must be a valid email address').optional(),
      contactNo: z
        .string()
        .max(15, 'Contact number must not exceed 15 digits')
        .optional(),
      dateOfBirth: z.date().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      gender: z
        .enum(['male', 'female'], {
          required_error: 'Gender is required',
        })
        .optional(), // Fixed enum validation
      emergenceContactNo: z
        .string()
        .max(15, 'Emergency contact number must not exceed 15 digits')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present address is required')
        .max(200, 'Present address must not exceed 200 characters')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required')
        .max(200, 'Permanent address must not exceed 200 characters')
        .optional(),
      guardant: guardantSchemaUpdate.optional(),
      localGuardant: localGuardantSchemaUpdate.optional(),
    }),
  }),
});

// ------validation update

// ---------------------------------

export const studentSchemaValidations = {
  studentSchemaValidationZod,
};
