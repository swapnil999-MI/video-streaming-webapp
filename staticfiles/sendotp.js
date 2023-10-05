function sendotp() {
    document.getElementById("otpgen").addEventListener("click", function () {
        const form = document.querySelector(".form");

        // Create a FormData object to collect form data
        const formData = new FormData(form);

        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open('POST', '/homei/getotp/', true); // true for asynchronous request


        // Set a callback function to handle the response
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parse the JSON response
                const responseData = JSON.parse(xhr.responseText);

                // Check if the JSON response contains a redirect_url
                if (responseData.otp) {
                    // Redirect the user to the URL received in the response
                    receivedOTP = responseData.otp;
                    console.log(receivedOTP);
                }
                if (responseData.errors) {
                    console.log(responseData.errors);
                    displayErrors(responseData.errors);
                    //console.error('Invalid usrname or password');
                }

                else {
                    console.error('No OTP found in the JSON response.');
                }
            } else {
                console.error('Network response was not ok');
            }
        };

        // Set up error handling
        xhr.onerror = function () {
            console.error('Network error:', xhr.statusText);
        };

        // Set the content type header for the request
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Serialize the form data and send the request
        xhr.send(new URLSearchParams(formData));

        // Prevent the default form submission behavior
        event.preventDefault();
        // sourcery skip: avoid-function-declarations-in-blocks
        function displayErrors(errors) {
            // Assuming you have a div with id "error-messages" to display the errors
            const errorContainer = document.getElementById("message");
            errorContainer.innerHTML = "";
            errors.forEach(error => {
                const errorMessage = document.createElement("div");
                errorMessage.textContent = error;
                errorContainer.appendChild(errorMessage);
            });
        }
    });

}
