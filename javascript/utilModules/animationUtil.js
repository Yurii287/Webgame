// Error Input Animations and Colours
export const errorInputAnimation = [{transform: "translateX(0px)"}, {transform: "translateX(10px)"}, {transform: "translateX(-10px)"}, {transform: "translateX(10px)"}, {transform: "translateX(0px)"}];
export const errorInputBorder = "solid 2px #ef233c";

export function setDefaultColour(element) {
    element.style.borderBottom = "2px solid #edf2f4";
}

export function setSuccessColour(element){
    element.style.borderBottom = "solid 2px rgb(23, 228, 40)";
}