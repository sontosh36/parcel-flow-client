import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin/SocialLogin";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        toast.success("Login Successful");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-200 shadow hover:shadow-xl w-full p-3 mx-auto max-w-sm">
      <h2 className="text-3xl text-center">Welcome back</h2>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email address is Required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer.
            </p>
          )}
          <div>
            <Link to={""} className="text-sm link-hover link">
              Forget Password
            </Link>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p className="text-sm">
          New to be parcel flow{" "}
          <Link
            className="text-blue-500 underline"
            state={location.state}
            to={"/register"}
          >
            Register
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;