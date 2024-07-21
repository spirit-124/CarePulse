"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, genderOptions, IdentificationTypes } from "@/constants";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";

export enum formFieldType {
  INPUT = "input",
  CHECKBOX = "checkBox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
      };
      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
      console.log("New user", user);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="  space-y-4">
          <h1 className=" header">Welcome👋 </h1>
          <p className=" text-dark-700 sub-header">
            {" "}
            Let us know more about yourself
          </p>
        </section>
        <section className="  space-y-6">
          <div className="space-y-1 mb-9"></div>
          <h2 className=" sub-header">Personal Information </h2>

          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <div className=" flex flex-col xl:flex-row gap-6">
            <CustomFormField
              fieldType={formFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder=" johnXXX@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={formFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(+91) 555-5555"
            />
          </div>
          <div className=" flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={formFieldType.DATE_PICKER}
              control={form.control}
              name="birthdate"
              label="Date of Birth"
            />

            <CustomFormField
              fieldType={formFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex xl:justify-between h-11 gap-6"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {genderOptions.map((option, i) => (
                      <div key={option + i} className=" radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <label htmlFor={option} className="cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className=" flex flex-col xl:flex-row gap-6">
            <CustomFormField
              fieldType={formFieldType.INPUT}
              control={form.control}
              name="Address"
              label="Address"
              placeholder=" ex: 14 street, New York, NY - 5101"
            />

            <CustomFormField
              fieldType={formFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupataion"
              placeholder="Software Engineer"
            />
          </div>
          <div className=" flex flex-col xl:flex-row gap-6">
            <CustomFormField
              fieldType={formFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder=" Guardian's Name"
            />

            <CustomFormField
              fieldType={formFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="(+91) 555-5555"
            />
          </div>
        </section>
        <section className="  space-y-6">
          <div className="space-y-1 mb-9"></div>
          <h2 className=" sub-header">Medical Information </h2>

          <CustomFormField
            fieldType={formFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a Physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className=" flex cursor-pointer gap-2 items-center">
                  <Image
                    src={doctor.image}
                    alt="doctor"
                    height={32}
                    width={32}
                    className=" rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className=" flex flex-col xl:flex-row gap-6">
            <CustomFormField
              fieldType={formFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="ex: BlueCross"
            />
            <CustomFormField
              fieldType={formFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ex: ABC1234567"
            />
          </div>
          <div className=" flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={formFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="ex: Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
              fieldType={formFieldType.TEXTAREA}
              control={form.control}
              name="currentMedications"
              label="Current medications"
              placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>
          <div className=" flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={formFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family medical history (if relevant)"
              placeholder="ex: Mother had breast cancer"
            />
            <CustomFormField
              fieldType={formFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="ex: Asthma diagnosis in childhood"
            />
          </div>
        </section>
        <section className="  space-y-6">
          <div className="space-y-1 mb-9"></div>
          <h2 className=" sub-header">Identification and Verfication </h2>

          <CustomFormField
            fieldType={formFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification type"
            placeholder="Birth Certificate"
          >
            {IdentificationTypes.map((identity, i) => (
              <SelectItem key={identity + i} value={identity}>
                <div className=" flex cursor-pointer gap-2 items-center">
                  <p>{identity}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="IidentificationNumber"
            label="Identification Number"
            placeholder="ex 1234567"
          />
          <CustomFormField
            fieldType={formFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>
        <section className="  space-y-6">
          <div className="space-y-1 mb-9"></div>
          <h2 className=" sub-header">Consent and Privacy </h2>

          <CustomFormField
            fieldType={formFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />
          <CustomFormField
            fieldType={formFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health information for treatment purposes."
          />
          <CustomFormField
            fieldType={formFieldType.CHECKBOX}
            control={form.control}
            name="privacyCnsent"
            label="I acknowledge that I have reviewed and agree to the privacy policy."
          />
        </section>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
