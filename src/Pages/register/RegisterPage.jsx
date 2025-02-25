import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/Input/InputPage";
import { EMAIL } from "../../constant/pattern";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { registerUser, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const submit = async ({
    name,
    email,
    password,
    confirmPassword,
    address,
  }) => {
    try {
      if (password !== confirmPassword) {
        alert("Password does not match");
        return;
      }
      await registerUser(name, email, password, address);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container my-5 w-50" style={{ backgroundColor: "#e6ebf2" }}>
      <form
        className="w-75 mx-auto p-5 text-start"
        onSubmit={handleSubmit(submit)}
      >
        <div className="mb-3">
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div className="mb-3">
          <Input
            type="email"
            label="Email"
            className="form-control p-3"
            id="exampleInputEmail1"
            {...register("email", {
              required: true,
              pattern: EMAIL,
            })}
            placeholder="abcd@gmail.com"
            name="email"
          />
        </div>
        <div className="mb-3">
          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <div className="mb-3">
          <Input
            type="password"
            label="ConfirmPassword"
            {...register("confirmPassword", {
              required: true,
            })}
          />
        </div>
        <div className="mb-3">
          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: true,
            })}
          />
        </div>

        <button type="submit" className="btn btn-primary px-5">
          Register
        </button>
      </form>
    </div>
  );
}
