
let receivedOTP;
console.log("its javascript") 
function checkotpMatch() {
    const otp  = document.getElementById("otp").value;
    console.log('recived otp=',receivedOTP)
    console.log('otp=',otp)

    if (otp.toString() === receivedOTP.toString()) {
        document.getElementById("message").innerHTML = "OTP is right!";
        document.getElementById('otpForm').style.display = 'none';
        document.getElementById('passwordForm').style.display = 'block';
    } else {
        document.getElementById("message").innerHTML = "Please enter right OTP";
    }
}



function sendotp() {
   
        const form = document.querySelector(".form");

        // Create a FormData object to collect form data
        const formData = new FormData(form);
        
        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open('POST','/homei/getotp/', true); // true for asynchronous request

        // Set a callback function to handle the response
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Parse the JSON response
                const responseData = JSON.parse(xhr.responseText);

                // Check if the JSON response contains a redirect_url
                if (responseData.otp) {
                    // Redirect the user to the URL received in the response
                    receivedOTP = responseData.otp; 
                    console.log(receivedOTP)  
                }
                else if (responseData.errors){
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
        xhr.onerror = function() {
            console.error('Network error:', xhr.statusText);
        };

        // Set the content type header for the request
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Serialize the form data and send the request
        xhr.send(new URLSearchParams(formData));

        // Prevent the default form submission behavior
        event.preventDefault();

        function displayErrors(errors) {
            // Assuming you have a div with id "error-messages" to display the errors
            const errorContainer = document.getElementById("message");
            errorContainer.innerHTML = "";
        
            // Check if errors is an array before iterating over it
            if (Array.isArray(errors)) {
                errors.forEach(error => {  
                    const errorMessage = document.createElement("div");
                    errorMessage.textContent = error;
                    errorContainer.appendChild(errorMessage);
                });
            } else {
                // Handle the case where errors is not an array (e.g., if it's not defined or is of the wrong type)
                const errorMessage = document.createElement("div");
                errorMessage.textContent = errors;
                errorContainer.appendChild(errorMessage);
            }
        }
        
    
}

