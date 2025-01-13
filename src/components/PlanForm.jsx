import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, previousStep, updateUserPlan } from "../formStep/stepSlice";
import Advanced from "./icons/Advanced";
import Pro from "./icons/Pro";
import Arcade from "./icons/Arcade";

const PlanForm = () => {

    const dispatch = useDispatch();
    const [selectedPlan, setSelectedPlan] = useState({
        planName: '',
        planPrice: '',
        subsType: 'monthly',
    });

    const [errMsg, setErrMsg] = useState("");

    const plans = {
        monthly: {
            arcade: '$9/mo',
            advanced: '$12/mo',
            pro: '$15/mo',
        },
        yearly: {
            arcade: '$90/year',
            advanced: '$120/year',
            pro: '$150/year',
        }
    }
    const userSelectedPlan = useSelector((state) => state.step.userPlan);

    useEffect(() => {
        if (userSelectedPlan) {
            setSelectedPlan(userSelectedPlan);
        }

    }, [userSelectedPlan]);

    const handleChange = (e) => {
        const planName = e.target.value;
        const planPrice = plans[selectedPlan.subsType][planName];
        setErrMsg("");
        setSelectedPlan((prev) => ({
            ...prev,
            planName,
            planPrice,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPlan.planName) {
            setErrMsg("Select one plan below");
            return;
        }
        // console.log(selectedPlan);
        dispatch(updateUserPlan(selectedPlan));
        dispatch(nextStep());
    }

    const handlePrevious = (e) => {
        e.preventDefault();
        setErrMsg("");
        dispatch(previousStep());

    }

    const handleToggle = () => {
        setSelectedPlan((prev) => {
            const subsType = prev.subsType === "monthly" ? "yearly" : "monthly";
            const planPrice = plans[subsType][prev.planName] || "";
            return {
                ...prev,
                subsType,
                planPrice
            }
        }
        )
    }

    return (
        <div className="plan-div">

            <div>
                <h2 className="heading-h2">Select your plan</h2>
                <p className="heading-para">You have the option of monthly or yearly billing</p>
                <span className="error">{errMsg}</span>
            </div>

            <form onSubmit={handleSubmit} className="plan-form">

                <div className="plan-package-div">

                    {["arcade", "advanced", "pro"].map((plan) => (
                        <label
                            key={plan}
                            htmlFor={plan}
                            className={`make-radio ${selectedPlan.planName === plan ? 'selected-plan' : ''}`}>
                            {plan === "arcade" && <Arcade />}
                            {plan === "advanced" && <Advanced />}
                            {plan === "pro" && <Pro />}

                            <div className="plan-name-price-div">
                                <span>{plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
                                <input
                                    type="radio"
                                    id={plan}
                                    value={plan}
                                    checked={selectedPlan.planName === plan}
                                    onChange={handleChange}
                                    className="hidden-radio" />
                                <p>{plans[selectedPlan.subsType][plan]}</p>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="subs-type">
                    <p className={`${(selectedPlan.subsType == "monthly") ? 'high-light-text' : 'less-opacity'}`}>Monthly</p>
                    <label className="toggle-switch">
                        <input type="checkbox" className={`toggle-input ${selectedPlan.subsType === "yearly" ? 'active' : ''}`} checked={selectedPlan.subsType === "yearly"} onChange={handleToggle} role="switch" />
                        <span className="toggle-slider"></span>
                    </label>
                    <p className={`${selectedPlan.subsType === "yearly" ? 'high-light-text' : 'less-opacity'}`}>Yearly</p>
                </div>

                <div className="button-container two-buttons-container">
                    <Button className={"prevButton two-buttons"} name={"Go Back"} onClick={handlePrevious} />
                    <Button className={"nextButton two-buttons"} type={"submit"} name={"Next Step"} />
                </div>


            </form>


        </div>
    )
};

export default PlanForm;