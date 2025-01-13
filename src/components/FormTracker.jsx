import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DesktopBG from "./icons/DesktopBG";

const FormTracker = () => {

    const stepNumber = useSelector((state) => state.step.value);
    const currentStep = stepNumber > 4 ? 4 : stepNumber;

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return (
        <div className="tracker-field">

            {
                isMobile ? "" : <DesktopBG />
            }


            <div className="step-tracker">
                <ol>
                    {
                        ["your info", "select plan", "add-ons", "summary"].map((stepName, index) => (
                            <li key={index + 1} className={`list-number ${currentStep === index + 1 ? "current-step" : ""}`}>
                                <div className="list-div">
                                    <span className="step-count">step {index + 1}</span>
                                    <span className="step-name">{stepName}</span>
                                </div>
                            </li>
                        ))
                    }

                </ol>
            </div>

            <div className="step-tracker-mobile">
                {
                    [0, 1, 2, 3].map((ele, index) => (
                        <div key={index + 1} className={`mobile-step-number ${currentStep === index + 1 ? "current-step" : ""}`}>{ele + 1}</div>
                    ))
                }

            </div>
        </div>
    )
};

export default FormTracker;