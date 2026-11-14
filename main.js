const main_clock = document.querySelector(".main-time");
const main_date = document.querySelector(".date-display");

const cards_clock = document.querySelectorAll(".city-card .clock-city");
const cards_day = document.querySelectorAll(".day-city");

const cards = document.querySelectorAll(".city-card");

const active_cityname = document.querySelector("#active-city-name");
const active_cityquote = document.querySelector("#active-city-quote");

function getTime(timeZone) {
    return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: timeZone,
    }).format(new Date());
}

function getData(timeZone) {
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
        timeZone: timeZone,
    }).format(new Date());
}

function get_weekDay(timeZone) {
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        timeZone: timeZone,
    }).format(new Date());
}

let selectedTimezone = "Africa/Cairo";

/* Update main clock and date */
function updateMainClock() {
    main_clock.textContent = getTime(selectedTimezone);
    main_date.textContent = getData(selectedTimezone);
}

function updateCards() {
    cards_clock.forEach((clock) => {
        let card = clock.closest(".city-card");

        clock.textContent = getTime(card.dataset.timezone);
    });

    cards_day.forEach((p) => {
        let card = p.closest(".city-card");

        p.textContent = get_weekDay(card.dataset.timezone);
    });
}

updateMainClock();
updateCards();

setInterval(updateMainClock, 1000);
setInterval(updateCards, 1000);

const cities = {
    seoul: {
        name: "Seoul, South Korea",
        quote: "The city of modern technology",
    },

    london: {
        name: "London, United Kingdom",
        quote: "Home of Big Ben and the Thames",
    },

    cairo: {
        name: "Cairo, Egypt",
        quote: "The city of a thousand minarets",
    },

    tokyo: {
        name: "Tokyo, Japan",
        quote: "The city of neon lights and ancient temples",
    },
};

cards.forEach((card) => {
    card.addEventListener("click", () => {
        let cityKey = "";

        if (card.classList.contains("seoul")) {
            cityKey = "seoul";
        } else if (card.classList.contains("london")) {
            cityKey = "london";
        } else if (card.classList.contains("cairo")) {
            cityKey = "cairo";
        } else if (card.classList.contains("tokyo")) {
            cityKey = "tokyo";
        }

        selectedTimezone = card.dataset.timezone;

        updateMainClock();

        cards.forEach((one) => {
            one.classList.remove("active");
        });

        card.classList.add("active");

        active_cityname.textContent = cities[cityKey].name;
        active_cityquote.textContent = cities[cityKey].quote;
    });
});