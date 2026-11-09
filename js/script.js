
const form = document.getElementById("bookingForm");

const match = document.getElementById("match");
const stand = document.getElementById("stand");
const quantity = document.getElementById("quantity");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryPrice = document.getElementById("summaryPrice");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");

const message = document.getElementById("message");

// Update booking summary
function updateSummary() {

    const selectedStand = stand.options[stand.selectedIndex];

    const price = Number(selectedStand.dataset.price) || 0;
    const tickets = Number(quantity.value) || 0;

    summaryMatch.textContent = match.value || "Not Selected";
    summaryStand.textContent = stand.value || "Not Selected";
    summaryPrice.textContent = price;
    summaryQuantity.textContent = tickets;
    summaryTotal.textContent = price * tickets;
}

// Update summary when user changes selection
match.addEventListener("change", updateSummary);
stand.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);


// Handle form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const total = summaryTotal.textContent;
    const selectedMatch = match.value;

    // Show popup message
    alert(
        "Booking Successful!\n\n" +
        "Thank you, " + name + "!\n" +
        "Match: " + selectedMatch + "\n" +
        "Total Amount: ₹" + total
    );

    // Clear all form fields
    form.reset();

    // Reset booking summary
    updateSummary();

    message.textContent = "";

});



// Handle form reset
form.addEventListener("reset", function() {

    message.textContent = "";

    summaryMatch.textContent = "Not Selected";
    summaryStand.textContent = "Not Selected";
    summaryPrice.textContent = "0";
    summaryQuantity.textContent = "0";
    summaryTotal.textContent = "0";

});
