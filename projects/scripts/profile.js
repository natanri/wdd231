
document.addEventListener("DOMContentLoaded", function() {
    const year = document.getElementById("currentyear");
    const today = new Date();
    year.innerHTML = `${today.getFullYear()}`;

    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `${document.lastModified}`;

    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    displayUserProfile();
});

function displayUserProfile(){
    const userProfile = JSON.parse(localStorage.getItem('loggedInUser'));

    if(!userProfile){
        window.location.href = 'login.html';
    } else {
        const usernameElement = document.getElementById('username');
        const emailElement = document.getElementById('email');
        
        
        usernameElement.textContent = `Username: ${userProfile.username}`;
        emailElement.textContent = `Email: ${userProfile.email}`;
    }       
    
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}
