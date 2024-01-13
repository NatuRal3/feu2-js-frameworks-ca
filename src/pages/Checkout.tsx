//Checkout success
//List fictional order num
//Clear cart
//Link back to the store

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type CheckoutFormData = {
  firstName: string;
  age?: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(3, "Your first name should be at least 3 characterslong.")
      .max(10, "Your first name cannot be longer than 10 characters.")
      .required("Please enter your first name"),
    age: yup
      .number()
      .min(18, "Your age must be 18 or higher")
      .max(100, "Your age must be 100 or lower")
      .typeError("Your age must be a number"),
    address: yup
      .string()
      .min(5, "Your address should be at least 5 characters long.")
      .required("Please enter your address"),
    city: yup
      .string()
      .min(2, "Your city name should be at least 2 characters long.")
      .required("Please enter your city name"),
    postalCode: yup
      .string()
      .matches(/^[0-9]{5}$/, "Your postal code should be 5 digits.")
      .required("Please enter your postal code"),
    country: yup.string().required("Please select your country"),
  })
  .required();

function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    console.log("Checkout Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <p>{errors.firstName?.message}</p>
      <input {...register("age")} placeholder="Age" />
      <p>{errors.age?.message}</p>

      <input {...register("address")} placeholder="Address" />
      <p>{errors.address?.message}</p>

      <input {...register("city")} placeholder="City" />
      <p>{errors.city?.message}</p>

      <input {...register("postalCode")} placeholder="Postal Code" />
      <p>{errors.postalCode?.message}</p>

      <select {...register("country")}>
        <option value="">Select Country</option>

        <option value="USA">Norway</option>
        <option value="Canada">Finland</option>
        <option value="Canada">Sweden</option>
        <option value="Canada">Denmark</option>
        <option value="Canada">Iceland</option>
        <option value="Canada">South Africa</option>
      </select>
      <p>{errors.country?.message}</p>

      <input type="submit" value="Place Order" />
    </form>
  );
}

export default CheckoutForm;
