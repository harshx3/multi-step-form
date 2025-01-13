import React, { useState } from "react";
import InfoForm from "../components/InfoForm";
import PlanForm from "../components/PlanForm";
import FormTracker from "../components/FormTracker";
import AddonsForm from "../components/AddonsForm";
import LastStepForm from "../components/LastStepForm";
import ThankYou from "../components/ThankYou";
import { useSelector } from "react-redux";

const DisplayForm = () => {
    const step = useSelector((state) => state.step.value);




    return (
        <div className="display-form">
            <FormTracker />
            {step === 1 && <InfoForm />}
            {step === 2 && <PlanForm />}
            {step === 3 && <AddonsForm />}
            {step === 4 && <LastStepForm />}
            {step === 5 && <ThankYou />}


        </div>
    )
};

export default DisplayForm;