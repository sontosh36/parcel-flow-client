import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FiEdit3 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiListMagnifyingGlassBold } from "react-icons/pi";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/parcels?email=${user.email}`);
      return result.data;
    },
  });
  const handleParcelTrush = (id) => {
    console.log(id);
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold">My Parcels: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>Blue</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <PiListMagnifyingGlassBold />
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => handleParcelTrush(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
