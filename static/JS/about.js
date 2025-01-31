document.addEventListener("DOMContentLoaded", () => {
    const aboutDivs = document.querySelectorAll(".about_div1, .about_div2");

    aboutDivs.forEach((div) => {
        const title = div.querySelector(".about_title");
        const info = div.querySelector(".about_info");

        title.addEventListener("mouseenter", () => {
            div.classList.add("expanded");
        });

        div.addEventListener("mouseleave", () => {
            div.classList.remove("expanded");
        });
    });
});