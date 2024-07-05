document.addEventListener("DOMContentLoaded", async function(){
    async function fetchCompanies(){
        const response = await fetch("data/members.json");
        const companies = await response.json();
        createCard(companies);
    }
    
    function createCard(companies){
        const container = document.querySelector(".container2")
        container.innerHTML = "";
        companies.forEach(company => {
            let card = document.createElement("section");
            let name = document.createElement("h3")
            let img = document.createElement("img");
            let address = document.createElement("p");
            let phoneNumber = document.createElement("p");
            let website = document.createElement("span");
            
            
            name.innerHTML = `${company.name}`
            img.setAttribute("src", company.imageURL);
            img.setAttribute("alt", `${company.name}`)
            img.setAttribute("loading","lazy");
            address.innerHTML = `${company.addresses}`;
            phoneNumber.innerHTML = `${company.phoneNumbers.main}`;

            let link = document.createElement("a");
            link.setAttribute("href", `${company.websiteURLs}`);
            link.setAttribute("target", "_blanck")
            link.innerHTML = "Details";

            website.appendChild(link)

            card.appendChild(name);
            card.appendChild(img);
            card.appendChild(address);
            card.appendChild(phoneNumber);
            card.appendChild(website);

            container.appendChild(card)
            
        });

    }    

    const gridbutton = document.getElementById("grid");
    /*console.log(gridbutton);*/
    const listbutton = document.getElementById("list");
    const display = document.querySelector("figure");

    gridbutton.addEventListener('click', () => {
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listbutton.addEventListener('click', showList);

    function showList(){
        display.classList.add("list");
        display.classList.remove("grid");

        while(display.firstChild){
            display.removeChild(display.firstChild);
        }

        fetchCompanies();
    }

    await fetchCompanies();
});