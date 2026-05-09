import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from './../../Hooks/useAuth';

const ParcelSend = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  // explore useMemo, useCallBack
  const districtByRegions = (region) => {
    const regionDistrict = serviceCenters.filter(
      (center) => center.region === region,
    );
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

  const handleParcelSend = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} TK`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agree",
    }).then((result) => {
      if (result.isConfirmed)
        // save the parcel info to the database
      axiosSecure.post('/parcels', data)
      .then(res =>{
        console.log('after saving parcel', res.data)
      })
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 bg-base-200 py-19">
      <h2 className="font-bold text-3xl md:text-4xl mb-4">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleParcelSend)}
        className="mt-4 p-5 text-black"
      >
        {/* parcel types */}
        <div className="mb-9">
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value={"document"}
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value={"non-document"}
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-7">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName", { required: true })}
              className="input w-full"
              placeholder="Parcel Name"
            />
            {errors.parcelName?.type === "required" && (
              <p className="text-red-500">Parcel Name is required</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight</label>
            <input
              type="number"
              {...register("parcelWeight", { required: true })}
              className="input w-full"
              placeholder="Parcel Weight"
            />
            {errors.parcelWeight?.type === "required" && (
              <p className="text-red-500">Parcel weight is required</p>
            )}
          </fieldset>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <h4 className="text-3xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="w-full input"
              readOnly
            />
            {/* sender email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="w-full input"
              readOnly
            />

            {/* sender phone */}
            <label className="label mt-4">Phone</label>
            <input
              type="number"
              {...register("senderPhone", { required: true })}
              className="w-full input"
              placeholder="Sender Phone Number"
            />
            {errors.senderPhone?.type === "required" && (
              <p className="text-red-500">Sender phone is required</p>
            )}
            {/* sender regions */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register("senderRegion", { required: true })}
                defaultValue=""
                className="select"
              >
                <option disabled={true} value={""}>
                  Pick a regions
                </option>
                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.senderRegion?.type === "required" && (
                <p className="text-red-500">Sender Region is required</p>
              )}
            </fieldset>
            {/* sender districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("senderDistrict", { required: true })}
                defaultValue=""
                className="select"
              >
                <option disabled={true} value={""}>
                  Pick a District
                </option>
                {districtByRegions(senderRegion).map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.senderDistrict?.type === "required" && (
                <p className="text-red-500">Sender District is required</p>
              )}
            </fieldset>
            {/* sender address */}
            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("senderAddress", { required: true })}
              className="w-full input"
              placeholder="Sender Address"
            />
            {errors.senderAddress?.type === "required" && (
              <p className="text-red-500">Sender Address is required</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <h4 className="text-3xl font-semibold">Receiver Details</h4>
            {/* receiver name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("receiverName", { required: true })}
              className="w-full input"
              placeholder="Receiver Name"
            />
            {errors.receiverName?.type === "required" && (
              <p className="text-red-500">Receiver Name is required</p>
            )}
            {/* receiver email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("receiverEmail", { required: true })}
              className="w-full input"
              placeholder="Receiver Email"
            />
            {errors.receiverEmail?.type === "required" && (
              <p className="text-red-500">Receiver Email is required</p>
            )}
            {/* receiver phone */}
            <label className="label mt-4">Phone</label>
            <input
              type="number"
              {...register("receiverPhone", { required: true })}
              className="w-full input"
              placeholder="Receiver Phone Number"
            />
            {errors.receiverPhone?.type === "required" && (
              <p className="text-red-500">Receiver Phone is required</p>
            )}
            {/* receiver regions */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register("receiverRegion", { required: true })}
                defaultValue=""
                className="select"
              >
                <option disabled={true} value={""}>
                  Pick a Regions
                </option>
                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.receiverRegion?.type === "required" && (
                <p className="text-red-500">Receiver Region is Required</p>
              )}
            </fieldset>
            {/* receiver district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("receiverDistrict", { required: true })}
                defaultValue=""
                className="select"
              >
                <option disabled={true} value={""}>
                  Pick a District
                </option>
                {districtByRegions(receiverRegion).map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.receiverDistrict?.type === "required" && (
                <p className="text-red-500">Receiver District is Required</p>
              )}
            </fieldset>
            {/* receiver address */}
            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("receiverAddress", { required: true })}
              className="w-full input"
              placeholder="Receiver Address"
            />
            {errors.receiverAddress?.type === "required" && (
              <p className="text-red-500">Receiver Address is required</p>
            )}
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary rounded-md text-black mt-7 text-2xl"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default ParcelSend;
