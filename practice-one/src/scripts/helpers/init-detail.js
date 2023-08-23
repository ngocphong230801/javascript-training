import { getQueryParameter } from "./params";

// Event name for when the DOM content has finished loading.
const DOMContentLoadedEvent = "DOMContentLoaded";

// The query parameter key for book information.
const bookInfoQueryParam = "bookInfo";

// Error message for failed parsing of bookInfo.
const parsingErrorMessage = "Error parsing bookInfo:";

/**
 * Initialize the page by handling the DOMContentLoaded event.
 * @param {Function} callback - The callback function to execute after successful bookInfo parsing.
 */
export const initializePage = (callback) => {
    document.addEventListener(DOMContentLoadedEvent, () => {
        // Get the value of the "bookInfo" query parameter from the URL.
        const bookInfoString = getQueryParameter(bookInfoQueryParam);

        if (bookInfoString) {
            try {
                // Parse the bookInfo JSON and decode its URI components.
                const bookInfo = JSON.parse(
                    decodeURIComponent(bookInfoString)
                );

                // Call the provided callback with the parsed bookInfo.
                callback(bookInfo);
            } catch (error) {
                // Display an alert if parsing the bookInfo failed.
                alert(`${parsingErrorMessage} ${error}`);
            }
        } else {
            // Display an alert if no "bookInfo" parameter is found in the URL.
            alert("No bookInfo parameter found in the URL.");
        }
    });
};
