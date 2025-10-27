import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { setToken } from "../Helper/SessionHelper";
import { BaseUrl } from "../Helper/config";

export default function Login() {
const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${BaseUrl}/login`, formData);
      const data = response.data;

      if (data.status === "Success") {
        setToken(data.token);
        toast.success(`${data?.msg || "Login Successfully"}`);
        reset();
        navigate("/"); 
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="dark:bg-gray-900 shadow-2xl rounded-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600 dark:text-white">
          Login Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Mobile */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              {...register("mobile", { required: "Mobile number is required" })}
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-5">
          Don't have an account?
          <Link
            to="/createUser"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
