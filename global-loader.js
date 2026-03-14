// global-loader.js

// Show the global loader and hide it after 1 second
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("global-loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none"; // Hide the loader after 1 second
        }, 1000);
    }
});
