document.addEventListener("DOMContentLoaded", async function(){
    const year = document.getElementById("currentyear");
    const today = new Date();
    year.innerHTML = `${today.getFullYear()}`; 

    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `${today.toLocaleString()}`

    
    const menuToggle = document.querySelector( '.menu-toggle' );
    const menuCheckbox = document.getElementById('menu-toggle-checkbox');
    const menu = document.querySelector('.menu');
    const xClose = document.getElementById('x-close')
        

    function toggleMenuButton(){
        if(window.innerWidth < 430) {
            menuToggle.style.display = "block";
            menu.style.display = 'none'
            
        }else{
            menuToggle.style.display = "block";
            menu.style.display = 'flex'
        }
    }

    toggleMenuButton();
    window.addEventListener('resize', toggleMenuButton);

    menuCheckbox.addEventListener('change', function(){
        if(menuCheckbox.checked){
            menu.style.display = 'block';
        } else{
            menu.style.display = 'none';
        }
    });

    xClose.addEventListener('click', function(e){
        e.preventDefault();
        menuCheckbox.checked = false;
        menu.style.display = 'none';
    });

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

    const gridbutton = document.querySelector("#grid");
    const listbutton = document.querySelector("#list");
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


