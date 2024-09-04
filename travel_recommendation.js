function searchRecommendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.getElementById("hero-recommendations");
    const result = [];

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            cards.innerHTML = "";
            switch(input) {
                case "country":
                case "countries":
                    for(item of data.countries)
                        for(city of item.cities) result.push(city);
                    break;
                case "temple":
                case "temples":
                    for(item of data.temples) result.push(item);
                    break;
                case "beach":
                case "beaches":
                    for(item of data.beaches) result.push(item);
                    break;

            }
            for(item of result) {
                const card = document.createElement("div");
                const img = document.createElement("img");
                const cardBody = document.createElement("div");
                const cardTitle = document.createElement("h5");
                const cardText = document.createElement("p");

                card.classList.add("card", "mx-2", "w-25");
                card.style.height = "fit-content"
                

                img.classList.add("card-img-top", "img-fluid");
                img.setAttribute("src", item.imageUrl);

                cardBody.classList.add("card-body");

                cardTitle.classList.add("card-title");
                cardTitle.innerText = item.name;

                cardText.classList.add("card-text", "fs-5");
                if(input === "country" || input === "countries"){
                    cardText.classList.remove("fs-5");
                    cardText.style.fontSize = "9px";
                }
                cardText.innerText = item.description;

                cards.appendChild(card);
                card.appendChild(img);
                card.appendChild(cardBody);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
            }
        })
        .catch(error => {
            console.log(error);
            const card = document.createElement("div");
            card.innerHTML = "<p>Found no recommendations!</p>";
            cards.appendChild(card);
        });
}

btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", searchRecommendation);

btnClear = document.getElementById("clearSearch");
btnClear.addEventListener("click", () => {
    const cards = document.getElementById("hero-recommendations");
    cards.innerHTML = "";
});