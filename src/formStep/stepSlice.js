import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 1,
    userInfo: {},
    userPlan: {
        planName: "",
        planPrice: "",
        subsType: "monthly",
    },
    userAddons: {
        "Online service": { selected: false, monthlyPrice: 1, yearlyPrice: 10 },
        "Large storage": { selected: false, monthlyPrice: 2, yearlyPrice: 20 },
        "Customizable profile": { selected: false, monthlyPrice: 2, yearlyPrice: 20 },
    },
}

export const stepSlice = createSlice({
    name: "formStep",
    initialState,
    reducers: {
        nextStep: (state) => {
            if (state.value === 5) {
                return;
            }
            else {
                state.value += 1;
            }

        },
        previousStep: (state) => {
            if (state.value == 1) {
                return;
            }
            else {
                state.value -= 1;
            }
        },
        updateUserInfo: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
            localStorage.setItem("name", state.userInfo.name);
            localStorage.setItem("email", state.userInfo.email);
            localStorage.setItem("number", state.userInfo.phoneNumber)
        },
        updateUserPlan: (state, action) => {
            state.userPlan = action.payload;
            localStorage.setItem("plan", state.userPlan);
        },
        updateUserAddons: (state, action) => {
            Object.keys(action.payload).forEach((addon) => {
                if (state.userAddons[addon]) {
                    state.userAddons[addon].selected = action.payload[addon];
                }
            })

            localStorage.setItem("addOns", JSON.stringify(state.userAddons));
        }
    }
});

export const { nextStep, previousStep, updateUserInfo, updateUserPlan, updateUserAddons } = stepSlice.actions;
export default stepSlice.reducer;