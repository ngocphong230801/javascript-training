import { getQueryParameter } from "./params";

const DOMContentLoadedEvent = "DOMContentLoaded";
const bookInfoQueryParam = "bookInfo";
const parsingErrorMessage = "Error parsing bookInfo:";

export const initializePage = (callback) => {
    document.addEventListener(DOMContentLoadedEvent, () => {
        const bookInfoString = getQueryParameter(bookInfoQueryParam);

        if (bookInfoString) {
            try {
                const bookInfo = JSON.parse(
                    decodeURIComponent(bookInfoString)
                );
                callback(bookInfo);
            } catch (error) {
                alert(`${parsingErrorMessage} ${error}`);
            }
        } else {
            alert("No bookInfo parameter found in the URL.");
        }
    });
};
