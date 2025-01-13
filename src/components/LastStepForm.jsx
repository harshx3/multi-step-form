import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, previousStep } from "../formStep/stepSlice";

const LastStepForm = () => {

    const dispatch = useDispatch();


    const handleNextStep = () => {
        dispatch(nextStep());
    }
    const handlePreviousStep = (e) => {
        e.preventDefault();
        dispatch(previousStep());
    }

    const plan = useSelector((state) => state.step.userPlan);
    const addOns = useSelector((state) => state.step.userAddons);


    const selectedAddOns = Object.entries(addOns)
        .filter(([_, addOn]) => addOn.selected)
        .map(([name, addOn]) => ({
            name,
            price: plan.subsType === "yearly" ? addOn.yearlyPrice : addOn.monthlyPrice,
        }));

    const totalPrice = (parseInt(plan.planPrice.replace(/[^0-9]/g, ""), 10) || 0) +
        selectedAddOns.reduce((acc, addOn) => acc + addOn.price, 0);

    return (
        <div className="last-step-div">

            <div>
                <h2 className="heading-h2">Finishing up</h2>
                <p className="heading-para">Double-check everything looks OK before confirming.</p>
            </div>

            <div className="plan-details">

                <div className="subs-plan">
                    <p><span className="pname">{plan.planName.charAt(0).toUpperCase() + plan.planName.slice(1)} </span><span className="stype">({plan.subsType.charAt(0).toUpperCase() + plan.subsType.slice(1)})</span></p>
                    <p style={{ color: "hsl(213, 96%, 18%)", fontWeight: "bold" }}>{plan.planPrice}</p>
                </div>
                <hr></hr>
                <div className="selected-addons-div">
                    <ul className="selected-addons-list">
                        {
                            selectedAddOns.map((addOn) => (
                                <li key={addOn.name} className="addons-list">
                                    <span>{addOn.name}</span>
                                    <span className="price">+${addOn.price}/{plan.subsType === "yearly" ? "yr" : "mo"}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className="total-price-div">
                <p>Total (per {plan.subsType.slice(0, 5)})</p>
                <p style={{ color: "hsl(243, 100%, 62%)", fontWeight: "bold" }}>+${totalPrice}/{plan.subsType === "yearly" ? "yr" : "mo"}</p>
            </div>

            <div className="button-container two-buttons-container">
                <Button className={"prevButton two-buttons"} name={"Go Back"} onClick={handlePreviousStep} />
                <Button className={"nextButton two-buttons confirm-button"} name={"Confirm"} onClick={handleNextStep} />
            </div>

        </div>
    )
};

export default LastStepForm;