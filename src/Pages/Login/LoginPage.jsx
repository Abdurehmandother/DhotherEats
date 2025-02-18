import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { EMAIL } from "../../constant/pattern";
import Input from "../../components/Input/InputPage";
export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const submit = async ({ email, password }) => {
    try {
      await login(email, password);
      console.log("Login successful!");
    } catch (error) {
      alert(error.message); // Show the error message to the user
    }
  };

  return (
    <div className="text-start mt-5 w-25 container m-auto ">
      <div>
        <div className="fs-3 fw-semibold">Login</div>

        <div className="py-3 px-2">
          <form
            onSubmit={handleSubmit(submit)}
            noValidate
            className="d-flex flex-column gap-3"
          >
            <Input
              type="email"
              label="Email"
              {...register("email", {
                required: true,
                pattern: EMAIL,
              })}
              error={errors.email}
            />

            <Input
              type="password"
              label="Password"
              {...register("password", {
                required: true,
              })}
              error={errors.password}
            />

            <button type="submit" className="btn btn-success my-3 w-25 m-auto">
              Login
            </button>

            <div>
              New user? &nbsp;
              <Link
                to={`/register${returnUrl ? "?returnUrl=" + returnUrl : ""}`}
              >
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
