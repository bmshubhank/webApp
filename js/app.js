
// Reusable Toast Notification Function
function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Smooth Scrolling and Notification
document.addEventListener("DOMContentLoaded", function () {
    const bookingSection = document.getElementById("booking");

    if (window.location.hash === "#booking" && bookingSection) {
        bookingSection.scrollIntoView({
            behavior: "smooth"
        });

        showToast("Welcome! Please book your IPL tickets.");
    }
});
