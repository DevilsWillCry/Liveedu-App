import React, { useEffect, useState } from "react";

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

import patchUsers from "../services/users/patchUsers";
import getUsers from "../services/users/getUsers";
import { usersURL } from "../services/routes";

import countryCodes from "../db/country-codes.json";
import { Spinner } from "@material-tailwind/react";

function ProfileDetail() {
  const [user, setUser] = useState("");
  const [allUsers, setAllUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isChangedAccount, setisChangedAccount] = useState(false)
  const [ dataToChange, setdataToChange] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")));
    }
    
    const updateUser = async () => {
      if (isChangedAccount) {
        await patchUsers(`${usersURL}/${user.id}`, dataToChange);
        setisChangedAccount(false);
      }
    };
    updateUser();
  }, [isChangedAccount]);

  useEffect(() => {
    const usersData = async () => {
      try {
        const users = await getUsers(usersURL);
        setAllUsers(users);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    usersData();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const infoArray = [
    {
      title: user.name,
      description: "Enter your new username",
      type: "text",
      icon: (
        <UserIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
    {
      title: user.email,
      description: "Enter your new email address",
      type: "email",
      icon: (
        <EnvelopeIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
    {
      title: user.phone,
      description: "Enter your new phone number",
      type: "number",
      icon: (
        <PhoneIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
    {
      title: user.country,
      description: "Enter your new country",
      type: "country",
      icon: (
        <MapPinIcon className="h-8 w-8 bg-gradient-to-r from-[#BFC3FC] to-[#A2C3FC] saturate-[0.7] rounded-lg p-1" />
      ),
    },
  ];

  const handleShowAlert = async (previousData, type, description) => {
    if (type === "country") {
      const { value: countryCode } = await Swal.fire({
        title: "Select a new country to change",
        input: "select",
        inputOptions: countryCodes.map((country) => country?.name ? country.name: "N/A"),
        inputPlaceholder: "Select your country",
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
            if (!value) return "You need to select a country!";}
      });

      if (countryCode) {
        const country = countryCodes[countryCode].name;
        const newUserData = {...user, country };
        setisChangedAccount(true);
        setdataToChange({country});
        localStorage.setItem("userData", JSON.stringify(newUserData));
        Swal.fire("Updated!", "Your country has been updated", "success");
      }


    } else if (type === "number") {
      const countryOptions = countryCodes
        .map(
          (country) =>
            `<option value="${country.phone}" data-length="${country.phoneLength}">
              ${country.name} (${country.phone})
            </option>`
        )
        .join("");

      const { value } = await Swal.fire({
        title: description,
        html: `
          <select id="country-code" class="swal2-input" style="width: 210px; padding: 5px;">
            ${countryOptions}
          </select>
          <input type="text" id="phone-number" class="swal2-input" placeholder="Enter phone number" style="width:210px; margin-top: 10px;" />
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        preConfirm: () => {
          const countrySelect = document.getElementById("country-code");
          const countryCode = countrySelect.value;
          const phoneLength = parseInt(
            countrySelect.options[countrySelect.selectedIndex].getAttribute(
              "data-length"
            )
          );
          const phoneNumber = document.getElementById("phone-number").value;

          if (!phoneNumber) {
            Swal.showValidationMessage("You need to enter a phone number!");
            return false;
          }

          if (phoneNumber.length !== phoneLength) {
            Swal.showValidationMessage(
              `Phone number must be ${phoneLength} digits long for the selected country.`
            );
            return false;
          }

          return `${countryCode} ${phoneNumber}`;
        },
      });

      if (value) {
        setisChangedAccount(true);
        const newValue = value.replace(" ", "")
        if (newValue){
          const findUser = allUsers.find(user => user.phone === newValue);
          if(findUser){
            Swal.fire("Error", "The phone number already exists in the system", "error");
            return false;
          }
        }
        const newUserData = {...user, phone: newValue };
        setdataToChange({phone: newValue});
        localStorage.setItem("userData", JSON.stringify(newUserData));
        Swal.fire("Updated!", "Your phone number has been updated", "success");
      }
    } else {
      // Manejo para otros tipos de input
      const { value: inputvalue } = await Swal.fire({
        title: description,
        input: type,
        inputLabel: `Your previous: ${previousData}`,
        inputPlaceholder: description,
        confirmButtonText: "Update",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) return "You need to write something!";
          if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Please enter a valid email address!";
          }
        },
      });

      if (inputvalue) {
        if(type === "email"){
          setisChangedAccount(true);
          const newUserData = {...user, email: inputvalue };
          setdataToChange({email: inputvalue});
          localStorage.setItem("userData", JSON.stringify(newUserData));
          const findUser = allUsers.find(user => user.email === inputvalue);
          if(findUser){
            Swal.fire("Error", "The email address already exists in the system", "error");
            return false;
          }
          Swal.fire("Updated!", "Your email address has been updated", "success");
        }
        else {
          const findUser = allUsers.find(user => user.name === inputvalue);
          if(findUser){
            Swal.fire("Error", "The username already exists in the system", "error");
            return false;
          }
          setisChangedAccount(true);
          const newUserData = {...user, name: inputvalue };
          setdataToChange({name: inputvalue});
          localStorage.setItem("userData", JSON.stringify(newUserData));
          Swal.fire("Updated!", "Your username has been updated", "success");
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center justify-start gap-x-20 mb-5 mt-1 border-b-2">
        <ArrowLeftIcon
          className="h-[30px] w-[30px] rounded-lg p-1"
          onClick={() => {
            navigate("/profile");
          }}
        />
        <h1 className="text-lg font-bold text-[#4B4B4B]">Account Settings</h1>
      </div>
      <div className="flex flex-col p-3">
        <div className="flex flex-col gap-5">
          {infoArray.map((info, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-2 w-full justify-between"
            >
              <div className="flex flex-row items-center gap-x-3">
                {info.icon}
                <p className="text-[#4B4B4B] text-base">{info.title}</p>
              </div>
              <PencilSquareIcon
                onClick={() =>
                  handleShowAlert(info.title, info.type, info.description)
                }
                className="h-[20px] w-[20px] text-black rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
