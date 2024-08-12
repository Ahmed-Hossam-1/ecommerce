import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Not Vaild Email' }),
    password: z.string().min(6, { message: 'password mast be at least 6 char' }),
    confirm_password: z.string().min(6, { message: 'password mast be at least 6 char' }),
  })
  .refine(data => data.password == data.confirm_password, {
    message: 'password do not match',
    path: ['confirm_password'],
  });

export const signinSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Not Vaild Email' }),
  password: z.string().min(6, { message: 'password mast be at least 6 char' }),
});
