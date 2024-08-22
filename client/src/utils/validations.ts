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

export const createUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Not Vaild Email' }),
  password: z.string().min(6, { message: 'password mast be at least 6 char' }),
  role: z.string().min(1, { message: 'role is required' }),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  description: z.string().min(6, { message: 'description is required' }),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  description: z.string().min(6, { message: 'description is required' }),
  price: z.number().min(1, { message: 'price is required' }),
  productCount: z.number().min(1, { message: 'productCount is required' }),
  category: z.number().min(1, { message: 'category is required' }),
  mainImage: z.string().min(1, { message: 'image is required' }),
  images: z.array(z.string().min(1, { message: 'image is required' })),
});

export const sellerRequestSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Not Vaild Email' }),
  password: z.string().min(6, { message: 'password mast be at least 6 char' }),
});
