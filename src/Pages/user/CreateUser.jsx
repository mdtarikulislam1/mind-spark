import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { setToken } from "../Helper/SessionHelper";
import { BaseUrl } from "../Helper/config";

export default function CreateUser() {
   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${BaseUrl}/CreateUser`, {
        name: formData.name,
        mobile: formData.mobile,
        password: formData.password,
      });

      const data = response.data;
      console.log(data?.token);
      if (data.status === "Success") {
        toast.success(data?.msg || "Register Successfully");
        setToken(data?.token);
        reset();
        navigate("/");
      } else {
        toast.error(data?.msg || "Registration failed!");
      }
    } catch (error) {
      console.error("AxiosError response:", error.response?.data);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-[90%] max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className={`w-full border ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } dark:bg-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid mobile number",
                },
              })}
              className={`w-full border ${
                errors.mobile
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } dark:bg-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500`}
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
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full border ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } dark:bg-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              className={`w-full border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } dark:bg-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-transform duration-300 transform hover:scale-105 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
