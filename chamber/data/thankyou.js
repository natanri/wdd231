document.addEventListener('DOMContentLoaded', () => {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if(formData){      

        document.getElementById('first-name-display').textContent = formData.firstName;
        document.getElementById('last-name-display').textContent = formData.lastName;
        document.getElementById('organization-title-display').textContent = formData.organizationTitle;
        document.getElementById('email-display').textContent = formData.email;
        document.getElementById('phone-display').textContent = formData.phone;
        document.getElementById('organization-display').textContent = formData.organization;
        document.getElementById('membership-level-display').textContent = formData.membershipLevel;
        document.getElementById('timestamp-display').textContent = formData.timestamp;
        
    }
    
});