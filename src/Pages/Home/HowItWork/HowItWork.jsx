import React from "react";
import bookingIcon from "../../../assets/bookingIcon.png";

const HowItWork = () => {
  const steps = [
    {
      icon: bookingIcon,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments- we deliver on time every time.",
    },
    {
      icon: bookingIcon,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments- we deliver on time every time.",
    },
    {
      icon: bookingIcon,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments- we deliver on time every time.",
    },
    {
      icon:bookingIcon,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments- we deliver on time every time.",
    },
  ];
  return (
    <div className="py-15 bg-gray-300 max-w-7xl px-5 rounded-lg">
      <h3 className="font-bold text-4xl md:text-5xl text-secondary text-center">
        How it Works
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {steps.map((item, i) => (
          <div className="bg-white flex flex-col items-center space-y-3 rounded-lg text-center shadow hover:shadow-xl p-8" key={i}>
            <img className="w-9 h-9" src={item.icon} alt={item.title} />
            <h4 className="text-secondary text-md font-semibold">
              {item.title}
            </h4>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
