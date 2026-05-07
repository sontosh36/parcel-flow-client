import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        toast.success("Registration Completed!");
        navigate("/");
        //store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);
        const imageApiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hostKey}`;
        axios.post(imageApiURL, formData).then((res) => {
          console.log("after image upload", res.data.data.url);
        });
        // update user profile
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-200 shadow hover:shadow-xl w-full p-3 mx-auto max-w-sm">
      <h2 className="text-3xl text-center">Create an Account</h2>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: true })}
            className="input w-full"
            placeholder="Enter Full Name"
          />
          {errors.fullName?.type === "required" && (
            <p className="text-red-500">Name is Required</p>
          )}
          {/* photo field */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="input w-full file-input"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is Required</p>
          )}
          {/* email field */}
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
          {/* password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
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
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have at least one uppercase, one Lowercase , one
              number and one special characters
            </p>
          )}
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link className="text-blue-500 underline" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
