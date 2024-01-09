// Translations
var translations = {
    en: {
        greeting: "CoastGuard",
        // ...
    },
    es: {
        greeting: "Guardacostas",
        // ...
    },
    fr: {
        greeting: "Garde-côte",
        // ...
        searchInput: "Chercher une plage...",
    },
    中国人: {
        greeting: "海岸警卫队",
        // ...
    },
    ar : {
        greeting: "خفر السواحل",
        // ...
    },
    hi : {
        greeting: "तटरक्षक बल",
        // ...
    },
    po : {
        greeting: "Guarda Costeira",
        // ...
    },
    ru : {
        greeting: "Береговая охрана",
        // ...
    },
    ja : {
        greeting: "沿岸警備隊",
        // ...
    },
    ur : {
        greeting: "کوسٹ گارڈ",
        // ...
    },

    


    // Add more translations as needed
};

// Set initial language
var currentLanguage = translations.en;

// Function to update the UI with translated text
function updateUI() {
    document.getElementById("greeting").textContent = currentLanguage.greeting;
    // ...
}

const dropdown = document.getElementById("dropDownInfo");
// Event listener for language buttons
var languageButtons = document.querySelectorAll(".dropdown-content button");
languageButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        var selectedLanguage = this.id.replace("Btn", "");
        currentLanguage = translations[selectedLanguage];
        dropdown.style.display = "none";

        updateUI();
    });

});

const dropdownButton = document.getElementById("dropBtn")
function showContent() {
    dropdown.style.display = "block";
}

// Initial translation on page load
updateUI();
