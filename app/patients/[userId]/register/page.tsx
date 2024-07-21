import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className=" h-screen max-h-screen flex">
      {/* TODO: otp verification \ passkey verfication  */}
      <section className=" remove-scrollbar container ">
        <div className=" sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt=" patient"
            className=" mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className=" side-img max-w-[390px]"
      />
    </div>
  );
};

export default page;
