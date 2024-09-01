/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useSigninUserMutation,
  useSignupUserMutation,
} from "../features/auth/api/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { signinSchema, signupSchema } from "../utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import CustomInput from "../components/CustomInput";
import { z } from "zod";

const Signup = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  type ISignUp = z.infer<typeof signupSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ISignUp>({
    mode: "onChange",
    resolver: zodResolver(pathname == "/signup" ? signupSchema : signinSchema),
  });

  const [signupUser] = useSignupUserMutation();
  const [signinUser] = useSigninUserMutation();

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    try {
      if (pathname === "/signup") {
        const user = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
        const res = await signupUser(user);
        cookies.set("token", res.data.jwt);
        // cookies.set("role", res.data.role);
        if (res.data.role == "admin" || res.data.role == "seller")
          nav("/admin_page");
        else nav("/");
        reset();
      } else if (pathname === "/signin") {
        const user = {
          email: data.email,
          password: data.password,
        };
        const res = await signinUser(user);
        cookies.set("token", res.data.jwt);
        // cookies.set("role", res.data.role);
        if (res.data.role == "admin") nav("/admin_page");
        else nav("/");
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[40%] p-[30px] flex flex-col justify-center bg-mainBackground dark:bg-secbgDark800">
        <h1 className="text-[30px] text-secondary font-bold text-center pb-3 dark:text-mainTextDark">
          {pathname === "/signup" ? "Sign Up" : "Sign in"}
        </h1>
        <form
          className="flex flex-col gap-y-3 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {pathname === "/signup" && (
            <CustomInput
              id="name"
              register={register}
              errors={errors}
              type="text"
              placeholder="First name and last name"
              label="name"
            />
          )}
          <CustomInput
            id="email"
            register={register}
            errors={errors}
            type="email"
            placeholder="Enter your email"
            label="email"
          />
          <CustomInput
            id="password"
            register={register}
            errors={errors}
            type="password"
            placeholder="Enter your password"
            label="password"
          />
          {pathname === "/signup" && (
            <CustomInput
              id="confirm_password"
              register={register}
              errors={errors}
              type="password"
              placeholder="Enter your confirm password"
              label="confirm password"
            />
          )}
          <button
            className="w-[350px] bg-secondary dark:text-mainTextDark hover:bg-primary p-2 rounded-md mt-3"
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="flex flex-col mt-5 text-center gap-2">
          <p className="dark:text-mainTextDark">
            {pathname === "/signup"
              ? "Already have an account?"
              : "Don’t have an account?"}{" "}
            <Link
              to={pathname === "/signup" ? "/signin" : "/signup"}
              className="text-secondary font-bold"
            >
              {pathname === "/signup" ? "Sign in" : "Sign up"}
            </Link>
          </p>
          <Link to="/register_seller" className="underline text-secondary">
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
