document.addEventListener("DOMContentLoaded", function () {
    // Fetch booked data from a script tag
    const bookedDataElement = document.getElementById('bookedData');
    let booked = {};

    try {
        booked = JSON.parse(bookedDataElement.textContent);
    } catch (e) {
        console.error('Error parsing booked data:', e);
    }

    console.log('Loaded booked data:', booked); // Debug: Log booked data to ensure it is loaded correctly

    // Select all booking cards
    const bookingCards = document.querySelectorAll(".booking_card");

    if (!bookingCards.length) {
        console.error("No booking cards found.");
        return;
    }

    // Add event listeners to each booking card
    bookingCards.forEach(card => {
        const seatContainer = card.querySelector(".seat_map");
        const confirmButton = card.querySelector(".confirm");
        const form = card.querySelector("form");
        const busNo = card.querySelector(".bus_no span").textContent.trim(); // Get the bus number
        console.log('Bus number:', busNo); // Debug: Log bus number to ensure it is retrieved correctly
        let hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "selected_seats";
        form.appendChild(hiddenInput);

        if (!seatContainer || !confirmButton) {
            console.error("Seat container or confirm button missing in a booking card.");
            return;
        }

        // Apply booked CSS to booked seats for this specific bus
        const bookedSeats = booked[busNo] || [];
        console.log('Booked seats for bus', busNo, ':', bookedSeats); // Debug: Log booked seats to ensure they are loaded correctly
        bookedSeats.forEach(seat_id => {
            const seat = seatContainer.querySelector(`#${seat_id}`);
            if (seat) {
                seat.classList.add("booked");
                console.log(`Seat ${seat_id} is booked.`); // Debug: Log booked seat ID
            }
        });

        // Handle seat selection
        seatContainer.addEventListener("click", function (event) {
            const seat = event.target.closest(".map");
            if (seat && !seat.classList.contains("booked")) {
                seat.classList.toggle("selected");
            }
        });

        // Handle confirm button click
        confirmButton.addEventListener("click", function (event) {
            event.preventDefault();

            const selectedSeats = [];
            seatContainer.querySelectorAll(".map.selected").forEach(seat => {
                selectedSeats.push(seat.id); // Get the seat ID
            });

            if (selectedSeats.length === 0) {
                alert("No seats selected!");
                return;
            }

            console.log("Selected Seats:", selectedSeats);
            hiddenInput.value = JSON.stringify(selectedSeats);

            // Submit the form for this specific booking card
            form.submit();
        });
    });
});
