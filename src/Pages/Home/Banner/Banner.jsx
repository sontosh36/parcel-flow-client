import React from "react";
import banner1 from "../../../assets/big-deliveryman.png";
import man from "../../../assets/tiny-deliveryman.png";
import { Link } from "react-router";
import { MdArrowOutward } from "react-icons/md";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-5 bg-white">
      <div className="md:flex gap-8 items-center">
        <div className="flex-2 text-center md:text-left">
          <div className="max-w-xl">
            <img src={man} alt="" className="pb-3" />
          </div>
          <h3 className="text-secondary text-3xl md:text-6xl font-bold">
            We Make Sure Your <br />{" "}
            <span className="text-primary">Parcel Arrives</span> On Time <br />{" "}
            - No Full
          </h3>
          <p className="text-md my-3 text-gray-500 max-w-2xl">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments- we deliver on time every time.</p>
          <div className="flex gap-6 items-center mb-3">
            <Link className="bg-primary rounded-2xl font-bold text-md md:text-xl p-3">Track Your Parcel  </Link> <MdArrowOutward size={15} className="-ms-5 p-2 w-10 h-10 md:w-12 md:h-12 text-gray-100 rounded-full bg-secondary"/>
            <Link className="border border-gray-400 hover:bg-primary rounded-2xl font-bold text-md md:text-xl p-3">Be A Rider</Link>
          </div>
        </div>
        <div className="flex-1">
          <img src={banner1} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
