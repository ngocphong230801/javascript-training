import { getElementById } from "./dom-helper";

/**
 * Toggle the display of an element by changing its style.
 * @param {string} elementId - The ID of the element to toggle.
 * @param {boolean} isShow - If true, the element will be displayed, otherwise it will be hidden.
 */
export const toggleDisplay = (elementId, isShow) => {
    const element = getElementById(elementId);
    if (element) {
        element.style.display = isShow ? "block" : "none";
    }
};
