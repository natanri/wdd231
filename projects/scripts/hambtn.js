document.addEventListener("DOMContentLoaded", function(){
    const toggleBtn = document.getElementById('toggleButton');
    const menubar = document.getElementById('menu-bar');

    toggleBtn.addEventListener('click', function(){
        menubar.classList.toggle('show');
        console.log("button clicked, class 'show' toggled")
    });

    function handleResize(){
        if (window.innerWidth > 450) {
            menubar.classList.remove('show');
            menubar.classList.add('desktop');          
    
        }else{
            menubar.classList.remove('desktop');            
        }
    } 
    
    window.addEventListener('resize', handleResize);
    handleResize();    
});

