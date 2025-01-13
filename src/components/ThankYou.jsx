import React from "react";
import Thank from "./icons/Thank";

const ThankYou = () => {
    return (
        <div className="thankyou-div">

            <div className="thankyou-page">
                <Thank />
                <h2 style={{ color: "hsl(213, 96%, 18%)", marginTop: "1rem" }}>Thank you!</h2>
                <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
            </div>

        </div>
    )
};

export default ThankYou;