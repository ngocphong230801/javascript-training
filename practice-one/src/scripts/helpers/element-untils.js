import { getElementById } from "./dom-helper";

export const toggleVisibility = (elementId, displayValue) => {
    const element = getElementById(elementId);
    if (element) {
        element.style.display = displayValue;
    }
};
