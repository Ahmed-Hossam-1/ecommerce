import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../components/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { sellerRequestSchema } from "../utils/validations";
import { z } from "zod";
import { useSendSellerReqMutation } from "../features/seller_req/api/seller_reqSlice";
import { toast } from "react-toastify";

const RegisterSeller = () => {
  type IsellerRequest = z.infer<typeof sellerRequestSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IsellerRequest>({
    mode: "onChange",
    resolver: zodResolver(sellerRequestSchema),
  });

  const [sendSellerReq, { isLoading }] = useSendSellerReqMutation();

  const onSubmit: SubmitHandler<IsellerRequest> = async (data) => {
    try {
      const res = await sendSellerReq(data).unwrap();
      toast.success(
        res.message + ", Please check your email for further instructions"
      );
      reset();
    } catch (err) {
      toast.error(err.data?.error || "An error occurred");
    }
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[40%] p-[30px] flex flex-col justify-center bg-white">
        <h1 className="text-[30px] text-secondary font-bold text-center pb-10">
          Register as a seller
        </h1>
        <form
          className="flex flex-col gap-y-3 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            id="name"
            register={register}
            errors={errors}
            type="text"
            placeholder="First name and last name"
            label="name"
          />
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
          <button
            className={`w-[350px] bg-secondary p-2 rounded-md mt-3 ${
              isLoading || isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting || isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="relative w-[60%] h-[100vh]">
        <div className="absolute bg-[rgba(0,0,0,0.3)] top-0 left-0 w-full h-full"></div>
        <img
          className="w-full h-full object-cover"
          src="/images/form.jpg"
          alt="Form Background"
        />
      </div>
    </div>
  );
};

export default RegisterSeller;
