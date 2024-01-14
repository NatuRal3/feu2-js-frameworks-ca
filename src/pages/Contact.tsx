//Subject (Minimum number of characters is 3, required)
//Email (Must be a valid email address, required)
//Body (Minimum number of characters is 3, required)

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

type ContactFormData = {
  name: string;
  subject: string;
  email: string;
  body: string;
};

const contactSchema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .required("Name is required."),
    subject: yup
      .string()
      .min(3, "Subject must be at least 3 characters long.")
      .required("Subject is required."),
    email: yup.string().email("Must be a valid email address.").required("Email is required."),
    body: yup
      .string()
      .min(3, "Message must be at least 3 characters long.")
      .required("Message is required."),
  })
  .required();

function Contact() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log("Contact Data:", data);
    navigate("/success"); // Adjust as needed
  };

  return (
    <>
      <div className="flex column items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Contact Us</h2>

          <input {...register("name")} placeholder="Name" />
          <p>{errors.name?.message}</p>

          <input {...register("subject")} placeholder="Subject" />
          <p>{errors.subject?.message}</p>

          <input {...register("email")} placeholder="Email" />
          <p>{errors.email?.message}</p>

          <textarea {...register("body")} placeholder="Your Message" />
          <p>{errors.body?.message}</p>

          <input type="submit" value="Send Message" />
        </form>
      </div>
    </>
  );
}

export default Contact;
