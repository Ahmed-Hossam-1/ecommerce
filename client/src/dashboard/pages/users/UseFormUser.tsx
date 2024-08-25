/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, updateUserSchema } from "../../../utils/validations";
import CustomDashInput from "../../components/CustomDashInput";
import {
  useCreateUserMutation,
  useUpdateUserMutation, // Ensure this is imported
  useGetUserByIdQuery,
} from "../../../features/users/api/userSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UseFormUser = ({ isEdit }: { isEdit: boolean }) => {
  const { userId } = useParams<{ userId: string }>();
  type createUser = z.infer<typeof createUserSchema>;
  const { pathname } = useLocation();
  const nav = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<createUser>({
    mode: "onChange",
    resolver: zodResolver(
      pathname == "/admin_page/users/adduser"
        ? createUserSchema
        : updateUserSchema
    ),
  });

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: userData } = useGetUserByIdQuery(userId, {
    skip: !isEdit,
  });

  useEffect(() => {
    if (isEdit && userData) {
      setValue("name", userData.user.name);
      setValue("email", userData.user.email);
      setValue("role", userData.user.role);
    }
  }, [userData]);

  const onSubmit: SubmitHandler<createUser> = async (data) => {
    if (isEdit && userId) {
      const res = await updateUser({ ...data, id: userId });
      res.data && nav("/admin_page/users");
      res.data && toast.success("User updated successfully");
    } else {
      const res = await createUser(data);
      res.data && nav("/admin_page/users");
      res.data && toast.success("User created successfully");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md p-8 rounded-lg space-y-6"
    >
      <CustomDashInput
        id="name"
        label="Name"
        register={register}
        errors={errors}
        placeholder="Enter name"
        type="text"
      />

      <CustomDashInput
        id="email"
        label="Email"
        register={register}
        errors={errors}
        placeholder="Enter email"
        type="email"
      />

      {!isEdit && (
        <CustomDashInput
          id="password"
          label="Password"
          register={register}
          errors={errors}
          placeholder="Enter password"
          type="password"
        />
      )}

      <div>
        <label
          htmlFor="role"
          className="block text-gray-700 text-sm font-semibold mb-1"
        >
          Role
        </label>
        <select
          id="role"
          {...register("role")}
          className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default UseFormUser;
