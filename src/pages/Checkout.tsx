//Checkout success
//List fictional order num
//Clear cart
//Link back to the store

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { getItem } from "../services/apiEngine";

type CheckoutFormData = {
  firstName: string;
  age?: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type Item = {
  id: string;
  title: string;
  price: number;
};

type CartItem = {
  id: string;
  counter: number;
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
      .matches(/^[0-9]{4}$/, "Your postal code should be 5 digits.")
      .required("Please enter your postal code"),
    country: yup.string().required("Please select your country"),
  })
  .required();

function CheckoutForm() {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };
  const [itemDetails, setItemDetails] = useState<{ [key: string]: Item }>({});

  useEffect(() => {
    if (cartItems.length) {
      fetchItemDetails(cartItems);
    }
  }, [cartItems]);

  const fetchItemDetails = async (cartItems: CartItem[]) => {
    try {
      const details = await Promise.all(cartItems.map((cartItem) => getItem(cartItem.id)));
      const items = details.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      setItemDetails(items);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    console.log("Checkout Data:", data);
    localStorage.setItem("cart", JSON.stringify([])); // Clear cart
  };

  return (
    <>
      <div className="flex column items-center checkout-summary">
        <h3>Order summary</h3>
        <ul>
          {cartItems.map((cartItem: CartItem, index: number) => {
            const item = itemDetails[cartItem.id];
            const itemTotal = item ? (item.price * cartItem.counter).toFixed(2) : "Loading...";
            return (
              <li key={index}>
                Quantity: {cartItem.counter} - {item?.title || "Loading..."} - Price:{" "}
                {item?.price.toFixed(2)}Kr - Total: {itemTotal}Kr
              </li>
            );
          })}
        </ul>
        <div>
          Total Price:{" "}
          {Object.values(itemDetails)
            .reduce((total, item) => {
              const cartItem = cartItems.find((ci: CartItem) => ci.id === item.id);
              return total + item.price * (cartItem ? cartItem.counter : 0);
            }, 0)
            .toFixed(2)}
          Kr
        </div>
      </div>
      <div className="flex column items-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>We need your information</h2>
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
      </div>
    </>
  );
}

export default CheckoutForm;
