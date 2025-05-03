document.addEventListener('DOMContentLoaded', () => {
    const fromInput = document.querySelector('.from_container .search_box');
    const toInput = document.querySelector('.to_container .search_box');
    const interchangeButton = document.querySelector('.interchange .inter');

    interchangeButton.addEventListener('click', () => {
        const tempValue = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = tempValue;
    });
});
