"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, FormikHelpers, Form as FormikForm } from 'formik';
import { LoginValues } from "@/utils/constants";
import { loginSchema } from "@/utils/validations";
import { useRouter } from "next/navigation";
import FormInput from "../form/input/FormInput";
import { login } from "./Action";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function SignInForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: { token } } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if(token) {
      router.push('/');
    }
  },[]);

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    login(values, setSubmitting, router, dispatch);
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <Formik
              validationSchema={loginSchema}
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <FormikForm>
                  <div className="space-y-6">
                    <div>
                      <Label>
                        Email <span className="text-error-500">*</span>{" "}
                      </Label>
                      <FormInput
                        placeholder="info@gmail.com"
                        type="email"
                        name="username"
                        error={errors.username && touched.username ? true : false}
                      />
                    </div>
                    <div>
                      <Label>
                        Password <span className="text-error-500">*</span>{" "}
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={isChecked} onChange={setIsChecked} />
                        <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                          Keep me logged in
                        </span>
                      </div>
                      <Link
                        href="/reset-password"
                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div>
                      <Button className="w-full" size="sm" type="submit">
                        Sign in
                      </Button>
                    </div>
                  </div>
                </FormikForm>
              )}
            </Formik>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
