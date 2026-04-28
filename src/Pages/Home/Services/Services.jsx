import React from "react";
import ServiceImg from '../../../assets/service.png';

const Services = () => {
    const serviceItem = [
        {
            icon: ServiceImg,
            title: "Express & Standard Delivery",
            description: "we deliver parcel within 24-72 hours in Dhaka, Chittagong, sylhet, Khulna and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off."
        },
        {
            icon: ServiceImg,
            title: "Nationwide Delivery",
            description: "we deliver parcels Nationwide with home delivery in every district. ensureing your product reach customers within 48-72 hours"
        },
        {
            icon: ServiceImg,
            title: "Fulfillment Solution",
            description: "we also offer customized service with inventory management support online ordeer processing, packaging and ofter sales support"
        },
        {
            icon: ServiceImg,
            title: "Cash on Home Delivery",
            description: "100% cash on delivery anywhere in Bangladesh with guaranted safety of your product"
        },
        {
            icon: ServiceImg,
            title: "Corporate Service",
            description: "customized corporate services which includes warehouse and inventory management support"
        },
        {
            icon: ServiceImg,
            title: "Parcel Return",
            description: "Through our revenue logistics faclity we allow end customers to return or exchange their producs with online merchants"
        },

    ]
  return (
    <div className="max-w-7xl mx-auto bg-secondary px-5 rounded-lg">
      <div className="py-15">
        <div className="text-center">
          <h3 className="font-bold text-white text-4xl md:text-5xl mb-4">
            Our Services
          </h3>
          <p className="max-w-3xl mx-auto text-gray-300">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments- we
            deliver on time every time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {
                serviceItem.map((item, i) => (
                    <div className={`text-center p-5 flex flex-col items-center space-y-4 rounded-xl shadow hover:shadow-2xl ${i === 1 ? 'bg-primary' : 'bg-white'} hover:bg-primary transition duration-200`} key={i}>
                        <img className="w-18 h-18 bg-gray-200 p-5 rounded-full" src={item.icon} alt={item.title} />
                        <h3 className="text-2xl text-secondary font-bold">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Services;
