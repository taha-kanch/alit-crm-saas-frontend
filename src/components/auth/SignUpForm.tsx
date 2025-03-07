"use client";
import { AuthService } from "@/api/Services/AuthService";
import Checkbox from "@/components/form/input/Checkbox";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { SignupValues } from "@/utils/constants";
import { signupSchema } from "@/utils/validations";
import { Formik, FormikHelpers, Form as FormikForm } from 'formik';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormInput from "../form/input/FormInput";
import { signup } from "./Action";
import { useDispatch } from "react-redux";

export default function SignUpForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: SignupValues,
    { setSubmitting }: FormikHelpers<SignupValues>
  ) => {
    signup(values, setSubmitting, router, dispatch);
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <Formik
              validationSchema={signupSchema}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <FormikForm>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* <!-- First Name --> */}
                      <div className="sm:col-span-1">
                        <Label>
                          First Name<span className="text-error-500">*</span>
                        </Label>
                        <FormInput
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          error={errors.firstName && touched.firstName ? true : false}
                        />
                      </div>
                      {/* <!-- Last Name --> */}
                      <div className="sm:col-span-1">
                        <Label>
                          Last Name<span className="text-error-500">*</span>
                        </Label>
                        <FormInput
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          error={errors.lastName && touched.lastName ? true : false}
                        />
                      </div>
                    </div>
                    {/* <!-- Email --> */}
                    <div>
                      <Label>
                        Email<span className="text-error-500">*</span>
                      </Label>
                      <FormInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        error={errors.email && touched.email ? true : false}
                      />
                    </div>
                    {/* <!-- Password --> */}
                    <div>
                      <Label>
                        Password<span className="text-error-500">*</span>
                      </Label>
                      <div className="relative">
                        <FormInput
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          name="password"
                          error={errors.password && touched.password ? true : false}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4 ${errors.password ? 'top-1/3' : 'top-1/2'}`}
                        >
                          {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                          )}
                        </span>
                      </div>
                    </div>
                    {/* <!-- Checkbox --> */}
                    {/* <div className="flex items-center gap-3">
                      <Checkbox
                        className="w-5 h-5"
                        checked={isChecked}
                        onChange={setIsChecked}
                      />
                      <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                        By creating an account means you agree to the{" "}
                        <span className="text-gray-800 dark:text-white/90">
                          Terms and Conditions,
                        </span>{" "}
                        and our{" "}
                        <span className="text-gray-800 dark:text-white">
                          Privacy Policy
                        </span>
                      </p>
                    </div> */}
                    {/* <!-- Button --> */}
                    <div>
                      <button className="fle items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </FormikForm>
              )}
            </Formik>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
