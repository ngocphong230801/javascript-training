// Declare a constant to store the API key for use when making requests to the API
const API_KEY = "e5588d24c18bd98a9b9aa46ec2e1769a";

// Define an asynchronous arrow function named uploadImageAndSave that takes an imageFile parameter
export const uploadImageAndSave = async (imageFile) => {
    // Create a FormData object to hold the data to be sent to the API
    const formData = new FormData();
    formData.append("key", API_KEY); // Add the API key to the FormData
    formData.append("image", imageFile); // Add the imageFile to the FormData

    try {
        // Use the fetch function to send a POST request to the API
        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        // Parse the response data as JSON
        const data = await response.json();

        // Return the URL of the uploaded image from the response data, if available
        return data?.data?.url;
    } catch (error) {
        // If an error occurs during the process, log an error message
        console.error("Error uploading image:", error);
        return null; // Return null to indicate the upload was not successful
    }
};
