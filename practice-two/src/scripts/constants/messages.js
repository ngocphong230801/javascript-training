const handleError = (functionName, error) => {
    const errorMessage = `Error while ${functionName}: ${error}`;
    console.error(errorMessage);
};

export default handleError;
