import { getElementById } from "./dom-helper";

export const toggleDisplay = (elementId, isShow) => {
    const element = getElementById(elementId);
    if (element) {
        element.style.display = isShow ? "block" : "none";
    }
};
