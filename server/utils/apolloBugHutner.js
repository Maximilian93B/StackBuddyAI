

// Custom error formatter for Apollo Server

function formatError(error) {
    console.error(error); // Log the full error


// Modify the error message before sending it to the client 

return {
    ...error,
    message: `Internal server error: ${error.message}`, // Corrected to use backticks for template literal
};
}

const errorLoggingPlugin = {
    requestDidStart(requestContext) {
        return {
            didEncounterErrors(rc) {
                rc.errors.forEach((error) => {
                    console.error(`Error encountered: ${error.message}`);
                    // Optionally, integrate with a logging library here
                });
            },
        };
    },
};

module.exports = { formatError, errorLoggingPlugin };