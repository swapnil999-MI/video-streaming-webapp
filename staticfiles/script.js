document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signInButton").addEventListener("click", function() {
        window.location.href = '/signin/myview/';
    });

    document.getElementById("loginButton").addEventListener("click", function(event) {
        // Get the form element
        const form = document.querySelector(".form");

        // Create a FormData object to collect form data
        const formData = new FormData(form);
        console.log(formData);

        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open('POST', '/logi/log/', true); // true for asynchronous request

        // Set a callback function to handle the response
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Parse the JSON response
                const responseData = JSON.parse(xhr.responseText);

                // Check if the JSON response contains a redirect_url
                if (responseData.redirect_url) {
                    // Redirect the user to the URL received in the response
                    window.location.href = responseData.redirect_url;
                }
                if (responseData.errors){
                    displayErrors(responseData.errors);
                    //console.error('Invalid usrname or password');
                }
                else {
                    console.error('No redirect_url found in the JSON response.');
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
// sourcery skip: avoid-function-declarations-in-blocks
        function displayErrors(errors) {
            // Assuming you have a div with id "error-messages" to display the errors
            const errorContainer = document.getElementById("error-messages");
            errorContainer.innerHTML = "";
            errors.forEach(error => {  
                const errorMessage = document.createElement("div");
                errorMessage.textContent = error;
                errorContainer.appendChild(errorMessage);
            });
        }
    });
});
