document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll(".seats");
    const buttons = document.querySelectorAll(".view_seat_btn");

    seats.forEach(seat => {
        seat.style.display = "none";
    });

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const seat = seats[index];
            if (seat.style.display === "none") {
                seat.style.display = "flex";
            } else {
                seat.style.display = "none";
            }
        });
    });
});

