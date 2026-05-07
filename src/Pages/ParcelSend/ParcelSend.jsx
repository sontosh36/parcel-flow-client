import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const ParcelSend = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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
    console.log(data);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 bg-base-200 py-19">
      <h2 className="font-bold text-4xl md:text-5xl mb-4">Send A Parcel</h2>
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
              {...register("parcelName", {required: true})}
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
              className="w-full input"
              placeholder="Sender Name"
            />
            {/* sender email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="w-full input"
              placeholder="Sender Email"
            />

            {/* sender phone */}
            <label className="label mt-4">Phone</label>
            <input
              type="number"
              {...register("senderPhone")}
              className="w-full input"
              placeholder="Sender Phone Number"
            />
            {/* sender regions */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a regions"
                className="select"
              >
                <option disabled={true}>Pick a regions</option>
                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* sender districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegions(senderRegion).map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* sender address */}
            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="w-full input"
              placeholder="Sender Address"
            />
          </fieldset>
          <fieldset className="fieldset">
            <h4 className="text-3xl font-semibold">Receiver Details</h4>
            {/* receiver name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="w-full input"
              placeholder="Receiver Name"
            />
            {/* receiver email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="w-full input"
              placeholder="Receiver Email"
            />

            {/* receiver phone */}
            <label className="label mt-4">Phone</label>
            <input
              type="number"
              {...register("receiverPhone")}
              className="w-full input"
              placeholder="Receiver Phone Number"
            />
            {/* receiver regions */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a regions"
                className="select"
              >
                <option disabled={true}>Pick a regions</option>
                {regions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* receiver district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegions(receiverRegion).map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* receiver address */}
            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="w-full input"
              placeholder="Receiver Address"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary rounded-md text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default ParcelSend;
