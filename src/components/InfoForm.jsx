import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateUserInfo } from "../formStep/stepSlice";

const InfoForm = () => {

    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });
    const [error, setError] = useState({});

    const userEnteredInfo = useSelector((state) => state.step.userInfo);

    useEffect(() => {
        if (userEnteredInfo) {
            setUserInfo(userEnteredInfo);
        }
    }, [userEnteredInfo])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setError(prevError => ({
            ...prevError,
            [name]: ""
        }))

        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(updateUserInfo(userInfo));
            dispatch(nextStep());
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!userInfo.name?.trim()) {
            newErrors.name = "Name is required";
        }

        if (!userInfo.email?.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!userInfo.phoneNumber?.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(userInfo.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid 10-digit number";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return (
        <div className="personal-info-div">
            <div className="">
                <h2 className="heading-h2">Personal info</h2>
                <p className="heading-para">Please provide your name, email address, and phone number</p>
            </div>

            <form onSubmit={handleSubmit} className="personal-info-form">
                <div className="input-label-div">
                    <label>Name</label>
                    {error.name && <span className="error">{error.name}</span>}
                    <input className={error.name ? "input-error" : ""} type="text" name="name" value={userInfo.name || ""} onChange={handleChange}
                    />
                </div>

                <div className="input-label-div">
                    <label>Email Address</label>
                    {error.email && <span className="error">{error.email}</span>}
                    <input className={error.email ? "input-error" : ""} type="email" name="email" value={userInfo.email || ""} onChange={handleChange}
                    />
                </div>

                <div className="input-label-div">
                    <label>Phone Number</label>
                    {error.phoneNumber && <span className="error">{error.phoneNumber}</span>}
                    <input className={error.phoneNumber ? "input-error" : ""} type="tel" name="phoneNumber" value={userInfo.phoneNumber || ""} onChange={handleChange}
                    />
                </div>

                <div className="button-container">
                    <Button className={"nextButton"} type={"submit"} name={"Next Step"} />
                </div>
            </form>

        </div>
    )
};

export default InfoForm;