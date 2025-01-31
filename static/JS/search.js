document.addEventListener('DOMContentLoaded', () => {
    const fromSearchBar = document.getElementById('search-bar-from');
    const fromResultsList = document.getElementById('results-from');
    const toSearchBar = document.getElementById('search-bar-to');
    const toResultsList = document.getElementById('results-to');
    const data = [
        "Swargate,Pune",
        "Majestic,Bengaluru",
        "Koyambedu,Chennai",
        "Andheri East,Mumbai",
        "Secunderabad,Hyderabad",
        "Esplanade,Kolkata",
        "Gandhinagar Bus Stop,Ahmedabad",
        "Sanganer,Jaipur",
        "Civil Lines,Delhi",
        "Alambagh Bus Stand,Lucknow",
        "Kanpur Central,Kanpur",
        "Sitabuldi,Nagpur",
        "Sarwate Bus Stand,Indore",
        "Chinar Park,Bhopal",
        "RTC Complex,Visakhapatnam",
        "Meethapur Bus Stand,Patna",
        "Ajwa Road,Vadodara",
        "Old Bus Stand,Ghaziabad",
        "Chembur,Navi Mumbai",
        "Howrah Bus Stand,Howrah",
        "Kacchi Chawni Bus Stand,Jammu",
        "Kaloor,Kochi",
        "Huda City Centre,Gurgaon",
        "Pandit Nehru Bus Station,Vijayawada",
        "MG Road,Thrissur",
        "Paltan Bazaar,Dehradun",
        "Avinashi Road,Coimbatore",
        "Baldhamar Crossing,Vasai",
        "Gol Chowk,Ghaziabad",
        "Kaka Nagar,Dwarka",
        "Connaught Place,Delhi",
        "Dadar West,Mumbai",
        "Banganga,Ujjain",
        "New Market,Ranchi",
        "Bhoothnath,Lucknow",
        "Tatabad,Coimbatore",
        "Ramnagar,Varanasi",
        "Railway Station,Bhubaneswar",
        "Jahangirpuri,Delhi",
        "Subhash Bridge,Ahmedabad",
        "Kazhakootam,Thiruvananthapuram",
        "Lal Darwaza,Surat",
        "Mattuthavani,Madurai",
        "Alambagh Bus Stand,Lucknow",
        "Isbt Kashmiri Gate,Delhi",
        "Saraswathi Nagar,Hyderabad",
        "Kalasipalya,Bengaluru",
        "Silk Board Junction,Bengaluru",
        "Vadodara Central Bus Station,Vadodara",
        "Maninagar,Ahmedabad",
        "Mylapore,Chennai",
        "Gopalapuram,Chennai",
        "Borivali West,Mumbai",
        "Panvel,Mumbai",
        "Bandra East,Mumbai",
        "Nampally,Hyderabad",
        "Charminar,Hyderabad",
        "Park Circus,Kolkata",
        "Shyambazar,Kolkata",
        "Vastrapur,Ahmedabad",
        "Airport Road,Jaipur",
        "Narayan Singh Circle,Jaipur",
        "Vijay Chowk,Delhi",
        "Green Park,Delhi",
        "Alambagh,Lucknow",
        "Aliganj,Lucknow",
        "Jheel Chowk,Bhopal",
        "Berasia Road,Bhopal",
        "RTC Complex,Vizag",
        "Dwaraka Nagar,Vizag",
        "Anisabad,Patna",
        "Gandhi Maidan,Patna",
        "Swaminarayan Mandir,Vadodara",
        "Raopura,Vadodara",
        "Naya Ganj,Ghaziabad",
        "Loni Border,Ghaziabad",
        "Nerul,Navi Mumbai",
        "Panvel,Navi Mumbai",
        "Sealdah,Howrah",
        "Bally Halt,Howrah",
        "Bus Stand,Jammu",
        "Gandhi Nagar,Jammu",
        "Kaloor Bus Stand,Kochi",
        "Vyttila,Kochi",
        "Gurugram Bus Stand,Gurgaon",
        "Sohna Road,Gurgaon",
        "Autonagar,Vijayawada",
        "Benz Circle,Vijayawada",
        "North Bus Stand,Thrissur",
        "West Fort,Thrissur",
        "ISBT,Dehradun",
        "Railway Station,Dehradun",
        "Gandhipuram,Coimbatore",
        "Ukkadam,Coimbatore",
        "Vasai West,Vasai",
        "Nallasopara,Vasai",
        "Indirapuram,Ghaziabad",
        "Vaishali,Ghaziabad",
        "Patel Nagar,Dwarka",
        "Nasirpur,Dwarka",
        "Janpath,Delhi",
        "Khan Market,Delhi",
        "Shivaji Park,Mumbai",
        "Lower Parel,Mumbai",
        "Mahakal Mandir,Ujjain",
        "Freeganj,Ujjain",
        "Albert Ekka Chowk,Ranchi",
        "Lalpur,Ranchi",
        "Hazratganj,Lucknow",
        "Charbagh,Lucknow",
        "Gandhipuram Bus Stand,Coimbatore",
        "Thudiyalur,Coimbatore",
        "Lahurabir,Varanasi",
        "Sigra,Varanasi",
        "Kalpana Square,Bhubaneswar",
        "Jayadev Vihar,Bhubaneswar",
        "GTB Nagar,Delhi",
        "Adarsh Nagar,Delhi",
        "Maninagar,Ahmedabad",
        "Thaltej,Ahmedabad",
        "Statue Junction,Thiruvananthapuram",
        "East Fort,Thiruvananthapuram",
        "Sarthana Jakatnaka,Surat",
        "Adajan,Surat",
        "Periyar Bus Stand,Madurai",
        "Kamarajar Salai,Madurai"
    ];

    function handleSearch(inputElement, resultsElement) {
        inputElement.addEventListener('input', () => {
            const query = inputElement.value.toLowerCase();
            resultsElement.innerHTML = '';

            const startingMatches = data.filter(item => item.toLowerCase().startsWith(query));
            let filteredData = startingMatches.length > 0 ? startingMatches : data.filter(item => item.toLowerCase().includes(query));

            if (inputElement.value) {
                filteredData.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item;
                    div.addEventListener('click', () => {
                        inputElement.value = item;
                        resultsElement.innerHTML = '';
                    });
                    resultsElement.appendChild(div);
                });
            }
        });
    }

    handleSearch(fromSearchBar, fromResultsList);
    handleSearch(toSearchBar, toResultsList);
});

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    dateInput.addEventListener('input', function () {
        if (this.value) {
            this.classList.add('has-value'); 
        } else {
            this.classList.remove('has-value'); 
        }
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     document.addEventListener("click", function (event) {
//         if (event.target.closest(".results div")) {
//             let resultsContainer = event.target.closest(".results");
//             let inputField = resultsContainer.previousElementSibling;

//             if (inputField && inputField.classList.contains("form_input")) {
//                 inputField.value = event.target.textContent;
//                 resultsContainer.style.display = "none"; 
//             }
//         }
//     });

//     document.querySelectorAll(".form_input").forEach(input => {
//         input.addEventListener("focus", function () {
//             let resultsContainer = this.nextElementSibling;
//             if (resultsContainer && resultsContainer.classList.contains("results")) {
//                 resultsContainer.style.display = "block"; 
//             }
//         });
//     });

//     document.addEventListener("click", function (event) {
//         if (!event.target.closest(".schedule_buses")) {
//             document.querySelectorAll(".results").forEach(results => {
//                 results.style.display = "none"; 
//             });
//         }
//     });
// });