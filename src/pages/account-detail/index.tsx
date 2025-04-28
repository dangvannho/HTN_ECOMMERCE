import { useState } from "react";
import FloatingInput from "@/components/commons/float-input";
const AccountDetail = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <h4 className=" text-[30px] lg:text-[35px] font-bold uppercase absolute lg:left-0 left-3 top-0 lg:-top-[90px]">
        Account details
      </h4>
      <form className="w-full flex flex-col gap-6">
        <div className="flex gap-6">
          <FloatingInput
            label="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FloatingInput
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <FloatingInput
          label="Display Name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <FloatingInput
          label="Email Address"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-base font-medium">PASSWORD CHANGE</p>
        <FloatingInput
          label="Current password (leave blank to leave unchanged)"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <FloatingInput
          label="New password (leave blank to leave unchanged)"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <FloatingInput
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="px-20 py-4 text-sm  bg-[#222] text-white w-max">
          SAVE CHANGES
        </button>
      </form>
    </>
  );
};

export default AccountDetail;
