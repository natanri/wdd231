document.addEventListener("DOMContentLoaded", async function(){
    const year = document.getElementById("currentyear");
    const today = new Date();
    year.innerHTML = `${today.getFullYear()}`; 

    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `${today.toLocaleString()}`

    
    const toggleButton = document.getElementById( 'toggleButton' );    
    const menuList = document.getElementById('menuList');    
     
    toggleButton.addEventListener('click', function(){
        menuList.classList.toggle('show');
    });


    function handleResize(){
        if(window.innerWidth > 430) {
            menuList.classList.remove('show');
            menuList.style.display = 'flex'
            
        }else{
            menuList.style.display = 'block';            
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize()    
    
});


