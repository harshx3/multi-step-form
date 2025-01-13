import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateUserAddons, previousStep } from "../formStep/stepSlice";
import Checkmark from "./icons/Checkmark";

const AddonsForm = () => {

    const dispatch = useDispatch();
    const services = [
        "Online service", "Large storage", "Customizable profile"
    ];
    const features = [
        "Access to multiple games",
        "Extra 1TB of cloud save",
        "Custom theme on your profile"
    ];
    const month = ["+1/mo", "+2/mo", "+2/mo"];
    const year = ["+10/yr", "+20/yr", "+20/yr"];

    const [errMsg, setErrMsg] = useState("");

    const userSelectedAddOns = useSelector((state) => state.step.userAddons);
    const userSelectedPlan = useSelector((state) => state.step.userPlan.subsType);


    useEffect(() => {

    }, [userSelectedAddOns])

    const handleCheck = (e) => {
        const { id, checked } = e.target;
        setErrMsg("");
        dispatch(updateUserAddons({
            [id]: checked,
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedAddons = Object.entries(userSelectedAddOns)
            .filter(([_, { selected }]) => selected)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        if (Object.keys(selectedAddons).length === 0) {
            setErrMsg("Select at least one add-on");
            return;
        }

        dispatch(nextStep());
    }

    const handlePrevious = (e) => {
        e.preventDefault();
        setErrMsg("");
        dispatch(previousStep());
    }

    return (
        <div className="addons-div">
            <div>
                <h2 className="heading-h2">Pick add-ons</h2>
                <p className="heading-para">Add ons help enhance you gaming experience</p>
                <span className="error">{errMsg}</span>
            </div>

            <form onSubmit={handleSubmit} className="addons-form">

                {
                    Object.keys(userSelectedAddOns).map((addon) => (
                        <label key={addon} htmlFor={addon} className={`addon-label ${userSelectedAddOns[addon].selected ? "clicked" : ""}`}>
                            <div className="checkbox-service-div">
                                <input
                                    type="checkbox"
                                    id={addon}
                                    checked={userSelectedAddOns[addon].selected}
                                    onChange={handleCheck}
                                />
                                <div className="service-name">
                                    <span className="service">{addon}</span>
                                    <span className="price">
                                        +${userSelectedPlan.subsType === "yearly"
                                            ? userSelectedAddOns[addon].yearlyPrice
                                            : userSelectedAddOns[addon].monthlyPrice
                                        }/{userSelectedPlan.subsType === "yearly" ? "yr" : "mo"}
                                    </span>
                                </div>
                            </div>
                        </label>
                    ))
                }
                <div className="button-container two-buttons-container">
                    <Button className={"prevButton two-buttons"} name={"Go Back"} onClick={handlePrevious} />
                    <Button className={"nextButton two-buttons"} type={"submit"} name={"Next Step"} />
                </div>

            </form>

        </div>
    )
};

export default AddonsForm;