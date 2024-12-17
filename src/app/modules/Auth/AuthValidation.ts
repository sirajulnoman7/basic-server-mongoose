import { z } from 'zod';

export const authValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
export const authChangePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old password is required',
    }),
    newPassword: z.string({
      required_error: 'new password is required',
    }),
  }),
});
export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh token  is required',
    }),
  }),
});
