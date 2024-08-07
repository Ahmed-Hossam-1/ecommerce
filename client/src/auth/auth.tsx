import { SubmitHandler, useForm } from "react-hook-form";
import { signupSchema } from "../utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { z } from "zod";

const Signup = () => {
  const { pathname } = useLocation();
  type ISignUp = z.infer<typeof signupSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ISignUp>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<ISignUp> = (data: ISignUp) => {
    const user = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    };
    reset();
    console.log(user);
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="border border-black p-[30px] rounded-md bg-white">
        <h1 className="text-[30px] pb-3">
          {pathname === "/signup" ? "Create account" : "Sign in"}
        </h1>
        <form
          className="flex flex-col gap-y-3 justify-center items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="name">Your name</label>
            <input
              className="w-[350px] border border-black rounded-md px-3 py-1"
              id="name"
              type="text"
              placeholder="First name and last name"
              {...register("full_name")}
            />
            {errors.full_name && <span>{errors.full_name.message}</span>}
          </div>
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="email">Your email</label>
            <input
              className="w-[350px] border border-black rounded-md px-3 py-1"
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="flex flex-col justify-center items-start">
            <label htmlFor="password">Password</label>
            <input
              className="w-[350px] border border-black rounded-md px-3 py-1"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          {pathname === "/signup" && (
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="confrim_password">Confirm password</label>
              <input
                className="w-[350px] border border-black rounded-md px-3 py-1"
                type="password"
                placeholder="Enter Your Confirm Password"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <span>{errors.confirm_password.message}</span>
              )}
            </div>
          )}
          <button
            className="w-[350px] bg-secondary p-2 rounded-md mt-2"
            disabled={isSubmitting}
            type="submit"
          >
            {pathname === "/signup" ? "Sign Up" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
