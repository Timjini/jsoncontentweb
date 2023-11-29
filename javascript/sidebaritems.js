// script.js

console.log("Hello from script.js");

// Function to create HTML for each country and append to the list
function populateCountryList() {
    const countryList = document.getElementById("country-list");
    const jsonDataAttribute = countryList.getAttribute("data-json");

    // Fetch JSON data dynamically based on the data attribute
    fetch(jsonDataAttribute)
        .then(response => response.json())
        .then(countryData => {
            countryData.forEach(country => {
                const listItem = document.createElement("li");
                listItem.className = "country-page-li";
            
                const itemContainer = document.createElement("div");
                itemContainer.className = "pb-2 side_bar_item_container";
            
                // Create an anchor element
                const link = document.createElement("a");
                link.href = country.url; // Assuming you have a "url" property in your country data
            
                const image = document.createElement("img");
                image.src = country.imageUrl;
                image.alt = "etudier au Canada";
                image.className = "img-fuild country-post-img";
            
                const textContainer = document.createElement("div");
                textContainer.className = "p-2";
                textContainer.style.display = "flex";
                textContainer.style.flexDirection = "column";
                textContainer.style.paddingLeft = "8px";
            
                const title = document.createElement("span");
                title.className = "item__title";
                title.textContent = country.title;
            
                const description = document.createElement("p");
                description.textContent = country.description;
            
                // Append elements to the anchor element
                itemContainer.appendChild(image);
                link.appendChild(textContainer);
            
                textContainer.appendChild(title);
                textContainer.appendChild(description);
            
                itemContainer.appendChild(link); // Append the anchor element instead of the image directly
            
                listItem.appendChild(itemContainer);
            
                countryList.appendChild(listItem);
            });
            
        })
        .catch(error => console.error("Error fetching JSON:", error));
}

// Call the function to populate the country list when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    populateCountryList();
});



// script.js

// Function to create HTML for each list item and append to the list
function populateListItems(list, container) {
    list.forEach(item => {
        const listItem = document.createElement("li");

        const itemContainer = document.createElement("div");

        const title = document.createElement("span");
        title.className = "list_item";
        const strong = document.createElement("strong");
        strong.className = "list_item_strong";
        strong.textContent = item.order;

        const description = document.createElement("p");
        description.textContent = item.description;

        // Append elements to the DOM
        title.appendChild(strong);
        title.appendChild(document.createTextNode(item.title + ': ')); // add a colon after the strong element
        itemContainer.appendChild(title);
        itemContainer.appendChild(description);

        listItem.appendChild(itemContainer);
        container.appendChild(listItem);
    });
}

// Function to populate the content based on JSON data
function populateContent(data) {
    const coverImage = document.querySelector(".country_img");
    const titleElement = document.querySelector(".country-title");
    const listContainer = document.querySelector(".mt-5");
    const additionalInfoContainer = document.querySelector(".additional-info");
    const descriptionElement = document.querySelector(".country-description");

    // Set the cover image, title, and additional info
    coverImage.src = data.coverImage;
    titleElement.textContent = data.title;
    descriptionElement.textContent = data.description;

    // Populate the list items
    populateListItems(data.listItems, listContainer);

    // Populate additional information
    data.additionalInfo.forEach(info => {
        const paragraph = document.createElement("p");
        paragraph.textContent = info;
        additionalInfoContainer.appendChild(paragraph);
    });
}

// Function to fetch JSON data based on the data-json attribute
function fetchData() {
    const countryContainer = document.getElementById("country-container");
    const jsonDataAttribute = countryContainer.getAttribute("data-json");

    // Fetch JSON data dynamically based on the data attribute
    fetch(jsonDataAttribute)
        .then(response => response.json())
        .then(data => {
            populateContent(data);
        })
        .catch(error => console.error("Error fetching JSON:", error));
}

// Call the function to fetch and populate data when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});