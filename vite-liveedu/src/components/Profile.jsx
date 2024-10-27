import React from "react";
import FooterName from "./FooterName";

import {
  UserIcon,
  ArrowsUpDownIcon,
  CreditCardIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import Swal from "sweetalert2";

import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate(null);
  function handleLogOut() {
    // Implement logout logic here
    // For example, you can remove the user from local storage or reset the state
    Swal.fire({
      title: `<h1 style='font-size: 1.8rem;'> You want to logout? </h1> `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#bfc3fc",
      cancelButtonColor: "#ef5350",
      confirmButtonText: "<span style='color: #4b4b4b;'>Yes, I want it!</span>",
      cancelButtonText: "<span style='color: #4b4b4b;'>No, cancel</span>",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Goodbye :c",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          localStorage.removeItem("user");
          navigate("/login");
        }, 1500);
      }
    });
  }

  const infoArray = [
    {
      title: "Personal information",
      link: "user-info",
      icon: (
        <UserIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
    {
      title: "Transaction history",
      link: "user-transaction-history",
      icon: (
        <ArrowsUpDownIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
    {
      title: "Payment",
      link: "user-payment",
      icon: (
        <CreditCardIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
    {
      title: "Terms of use",
      link: "user-terms-of-use",
      icon: (
        <NewspaperIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
    {
      title: "Support",
      link: "user-support",
      icon: (
        <QuestionMarkCircleIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
  ];
  return (
    <div className="relative w-full h-full">
      <FooterName text={"All your information"} />
      <div className="flex flex-col p-3">
        <div className="flex flex-col gap-5">
          {infoArray.map((item, index) => (
            <Link key={index} to={item.link}>
              <div className="flex flex-row items-center p-1 rounded-lg hover:bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] transition-all">
                {item.icon}
                <p className="px-3">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="absolute bottom-36 left-1/2 -translate-x-1/2 flex flex-row items-center justify-center gap-x-1 text-base font-bold p-1"
        onClick={handleLogOut}
      >
        <ArrowLeftStartOnRectangleIcon className=" h-8 w-8 z-30" />
        Log Out
      </div>
    </div>
  );
}

export default Profile;
