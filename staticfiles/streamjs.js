const videos = document.querySelectorAll('.video');
console.log('hello')
videos.forEach((video) => {
        console.log('hey')
        video.addEventListener('play', (event) => {
            const currentVideo = event.target;

            // Pause all other videos
            videos.forEach((otherVideo) => {
                if (otherVideo !== currentVideo) {
                    otherVideo.pause();
                }
            });
        });
    });



 document.addEventListener('DOMContentLoaded', function() {
        const videos = document.querySelectorAll('.video');
    
        videos.forEach((video) => {
            video.addEventListener('play', (event) => {
                const currentVideo = event.target;
    
                // Pause all other videos
                videos.forEach((otherVideo) => {
                    if (otherVideo !== currentVideo) {
                        otherVideo.pause();
                    }
                });
            });
        });
    });
    




function submitForm() {
        var title = document.getElementById('title').value;
        if (title) {
            // Construct the URL with the entered title and redirect
            var redirectUrl = "/stream/stream/" + encodeURIComponent(title) + "/";
            window.location.href = redirectUrl;
        } else {
            alert('Please enter a video title.');
        }
        return false; // Prevent form submission
    }


function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      }
      
function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.body.style.backgroundColor = "white";
      } 