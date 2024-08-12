/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form';
import { signinSchema, signupSchema } from '../utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useSigninUserMutation, useSignupUserMutation } from '../features/auth/api/authSlice';

const Signup = () => {
  const { pathname } = useLocation();
  type ISignUp = z.infer<typeof signupSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<ISignUp>({
    mode: 'onChange',
    resolver: zodResolver(pathname == '/signup' ? signupSchema : signinSchema),
  });

  const [signupUser, { data: returnSignup, isSuccess }] = useSignupUserMutation();
  const [signinUser] = useSigninUserMutation();

  const onSubmit: SubmitHandler<ISignUp> = async data => {
    console.log(data);
    console.log(pathname);
    try {
      if (pathname === '/signup') {
        const user = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
        const res = await signupUser(user);
        console.log(returnSignup, res, isSuccess);
      } else if (pathname === '/signin') {
        const user = {
          email: data.email,
          password: data.password,
        };
        await signinUser(user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[40%] p-[30px] flex flex-col justify-center rounded-md bg-white">
        <h1 className="text-[30px] text-secondary font-bold text-center pb-3">
          {pathname === '/signup' ? 'Sign Up' : 'Sign in'}
        </h1>
        <form className="flex flex-col gap-y-3 items-center" onSubmit={handleSubmit(onSubmit)}>
          {pathname === '/signup' && (
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="name">name</label>
              <input
                className="w-[350px] border border-black rounded-md px-3 py-1"
                id="name"
                type="text"
                placeholder="First name and last name"
                {...register('name')}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          )}
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="email">email</label>
            <input
              className="w-[350px] border border-black rounded-md px-3 py-1"
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="password">Password</label>
            <input
              className="w-[350px] border border-black rounded-md px-3 py-1"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          {pathname === '/signup' && (
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="confrim_password">Confirm password</label>
              <input
                className="w-[350px] border border-black rounded-md px-3 py-1"
                type="password"
                placeholder="Enter Your Confirm Password"
                {...register('confirm_password')}
              />
              {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
            </div>
          )}
          <button
            className="w-[350px] bg-secondary p-2 rounded-md mt-3"
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="flex flex-col mt-5 text-center gap-2">
          <p>
            {pathname === '/signup' ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <Link
              to={pathname === '/signup' ? '/signin' : '/signup'}
              className="text-secondary font-bold"
            >
              {pathname === '/signup' ? 'Sign in' : 'Sign up'}
            </Link>
          </p>
          <Link to="" className="underline text-secondary">
            register as a seller
          </Link>
        </div>
      </div>
      <div className="relative w-[60%] h-[100vh]">
        <div className="absolute bg-[rgba(0,0,0,0.3)] top-0 left-0 w-full h-full"></div>
        <img className="w-full h-full" src="/images/form.jpg" alt="" />
      </div>
    </div>
  );
};

export default Signup;
