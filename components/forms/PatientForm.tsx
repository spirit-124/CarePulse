"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"

export enum formFieldType {
  INPUT ="input",
  CHECKBOX = "checkBox",
TEXTAREA = "textarea",
PHONE_INPUT = "phoneInput",
DATE_PICKER = "datePicker",
SELECT = "select",
SKELETON = "skeleton"

}


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export const PatientForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    
  }
  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
      <section className=" mb-12 space-y-4">
        <h1 className=" header">Hi There 👋 </h1>
        <p className=" text-dark-700"> Schedule your first appointment.</p>

      </section>
      <CustomFormField
      fieldType = {formFieldType.INPUT}
      control = {form.control}
      name="name"
      label="Full Name"
      placeholder="John Doe"
      iconSrc="/assets/icons/user.svg"
      iconAlt="user"/>

      <CustomFormField
      fieldType = {formFieldType.INPUT}
      control = {form.control}
      name="email"
      label="email"
      placeholder=" johnXXX@gmail.com"
      iconSrc="/assets/icons/email.svg"
      iconAlt="email"/>

      <CustomFormField
      fieldType = {formFieldType.PHONE_INPUT}
      control = {form.control}
      name="phone"
      label="Phone Number"
      placeholder="(+91) 555-5555"/>

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>)
}

