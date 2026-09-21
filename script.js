const dayButtons = document.querySelectorAll("#day-options button");
const timeButtons = document.querySelectorAll("#time-options button");

dayButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        dayButtons.forEach(function(btn) {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});

timeButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        timeButtons.forEach(function(btn) {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});


const bookButton = document.getElementById("book-button");
const confirmation = document.getElementById("confirmation");

bookButton.addEventListener("click", async function() {

    const selectedDay = document.querySelector("#day-options .selected");
    const selectedTime = document.querySelector("#time-options .selected");
    const reason = document.querySelector("select").value;

    if (!selectedDay || !selectedTime) {
        confirmation.innerHTML =
            "<p>Please choose a day and time first 😌</p>";
        return;
    }

    bookButton.disabled = true;
    bookButton.innerText = "Booking... ❤️";

    try {

        const response = await fetch("https://formspree.io/f/xkjgjrye", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                day: selectedDay.innerText,
                time: selectedTime.innerText,
                reason: reason
            })
        });

        if (response.ok) {

            confirmation.innerHTML = `
                <h2>🎉 Appointment Confirmed!</h2>
                <p><strong>${selectedDay.innerText} at ${selectedTime.innerText} ❤️</strong></p>
                <p>Reason: ${reason}</p>
                <p>I'll be expecting your call 😌📞</p>
            `;

        } else {
            confirmation.innerHTML =
                "<p>Something went wrong. Please try again ❤️</p>";
        }

    } catch (error) {

        confirmation.innerHTML =
            "<p>Something went wrong. Please try again ❤️</p>";

    }

    bookButton.disabled = false;
    bookButton.innerText = "Book My Call ❤️";
});
