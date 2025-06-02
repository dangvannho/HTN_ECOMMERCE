import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatingInput from "@/components/commons/float-input";
import { accountDetailSchema, type AccountDetailFormInputs } from "@/schemas/account";

const AccountDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountDetailFormInputs>({
    resolver: zodResolver(accountDetailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: AccountDetailFormInputs) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <>
      <h4 className=" text-[30px] lg:text-[35px] font-bold uppercase absolute lg:left-0 left-3 top-0 lg:-top-[90px]">
        Account details
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <FloatingInput
              label="First name"
              type="text"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex-1">
            <FloatingInput
              label="Last Name"
              type="text"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div>
          <FloatingInput
            label="Display Name"
            type="text"
            {...register("displayName")}
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm mt-1">{errors.displayName.message}</p>
          )}
        </div>
        <div>
          <FloatingInput
            label="Email Address"
            type="text"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <p className="text-base font-medium">PASSWORD CHANGE</p>
        <div>
          <FloatingInput
            label="Current password (leave blank to leave unchanged)"
            type="password"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
          )}
        </div>
        <div>
          <FloatingInput
            label="New password (leave blank to leave unchanged)"
            type="password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>
        <div>
          <FloatingInput
            label="Confirm new password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="px-20 py-4 text-sm bg-[#222] text-white w-max">
          SAVE CHANGES
        </button>
      </form>
    </>
  );
};

export default AccountDetail;
