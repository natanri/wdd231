document.addEventListener("DOMContentLoaded", async function(){
    const year = document.getElementById("currentyear");
    const today = new Date();
    year.textContent = today.getFullYear(); 

    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = today.toLocaleString();

    const toggleButton = document.getElementById('toggleButton');    
    const menuList = document.getElementById('menuList');    

    toggleButton.addEventListener('click', function(){
        menuList.classList.toggle('show');
    });

    function handleResize(){
        if(window.innerWidth > 430) {
            menuList.classList.remove('show');
            menuList.style.display = 'flex';
        } else {
            menuList.style.display = 'none';            
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); 
    
    //visit message
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem("lastVisit");
    const currenTime = new Date().getTime();

    if(lastVisit){
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDiff = currenTime - lastVisitDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (lastVisit){
            visitMessage.textContent = 'Back so soon! Awesome';
        } else if(daysDiff == 1) {
            visitMessage.textContent = `You last visited 1 day ago`;
        } else{
            visitMessage.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }else{
        visitMessage.textContent = "Welcome! Let us know if you have any questions."
    }
    
    localStorage.setItem("lastVisit", currenTime.toString());
    
});
