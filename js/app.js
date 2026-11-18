
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

document.addEventListener("DOMContentLoaded", function () {

    // Activity 5: Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Booking Form Elements
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        const matchSelect = document.getElementById("match");
        const standSelect = document.getElementById("stand");
        const quantityInput = document.getElementById("quantity");

        const summaryMatch = document.getElementById("summaryMatch");
        const summaryStand = document.getElementById("summaryStand");
        const summaryQuantity = document.getElementById("summaryQuantity");
        const summaryPrice = document.getElementById("summaryPrice");
        const totalPrice = document.getElementById("totalPrice");

        // Activity 7: Update Booking Summary
        function updateSummary() {
            const match = matchSelect.value;
            const stand = standSelect.value;
            const quantity = Number(quantityInput.value);

            const selectedOption =
                standSelect.options[standSelect.selectedIndex];

            const price = Number(selectedOption.dataset.price) || 0;
            const total = price * quantity;

            summaryMatch.textContent = match || "Not selected";
            summaryStand.textContent = stand || "Not selected";
            summaryQuantity.textContent = quantity || 0;
            summaryPrice.textContent = price;
            totalPrice.textContent = total;
        }

        matchSelect.addEventListener("change", updateSummary);
        standSelect.addEventListener("change", updateSummary);
        quantityInput.addEventListener("input", updateSummary);

        // Reset Booking Summary
        bookingForm.addEventListener("reset", function () {
            setTimeout(function () {
                summaryMatch.textContent = "Not selected";
                summaryStand.textContent = "Not selected";
                summaryQuantity.textContent = "0";
                summaryPrice.textContent = "0";
                totalPrice.textContent = "0";
            }, 0);
        });

        // Booking Success Notification
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!bookingForm.checkValidity()) {
                bookingForm.reportValidity();
                return;
            }

            showToast("Your IPL ticket booking was successful!");
            bookingForm.reset();
        });

        // Smooth Scroll to Booking Form
        const bookingSection = document.getElementById("booking");

        if (window.location.hash === "#booking" && bookingSection) {
            bookingSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    }
    // Activity 8 - Grid and List View

const matchContainer = document.getElementById("matchContainer");
const gridButton = document.getElementById("gridView");
const listButton = document.getElementById("listView");

if (matchContainer && gridButton && listButton) {

    gridButton.addEventListener("click", function () {
        matchContainer.classList.remove("match-list");
        matchContainer.classList.add("match-grid");
    });

    listButton.addEventListener("click", function () {
        matchContainer.classList.remove("match-grid");
        matchContainer.classList.add("match-list");
    });

}


// Activity 8 - Team Filter

const teamFilter = document.getElementById("team");

if (teamFilter && matchContainer) {

    teamFilter.addEventListener("change", function () {

        const selectedTeam = teamFilter.value;
        const cards = matchContainer.querySelectorAll(".match-card");

        cards.forEach(function (card) {

            const teams = card.dataset.team;

            if (selectedTeam === "All" || teams.includes(selectedTeam)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}
});
