function checkPasswordMatch() {
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;
    console.log(password1)
    console.log(password2)

    if (password1 === password2) {
        document.getElementById("message").innerHTML = "Passwords is updated succesfully!";
        const form = document.querySelector(".form");``

        // Create a FormData object to collect form data
        const formData = new FormData(form);
        formData.append("password", password1);
        // Create an XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open('POST','/homei/updatepass/', true); // true for asynchronous request

        // Set a callback function to handle the response
        xhr.onload = function() {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                if (responseData.errors){
                    displayErrors(responseData.errors);
                }
                //document.getElementById("message").innerHTML = "Passwords is updated succesfully!";
            } else {
                document.getElementById("message").innerHTML = "Network response was not ok";
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
            const errorContainer = document.getElementById("messageforgo");
            errorContainer.innerHTML = "";
            errors.forEach(error => {  
                const errorMessage = document.createElement("div");
                errorMessage.textContent = error;
                errorContainer.appendChild(errorMessage);
            });
        }
    } else {
        console.log("Passwords do not match.")
        document.getElementById("messageforgo").innerHTML = "Passwords do not match.";
    }
}