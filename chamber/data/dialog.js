document.addEventListener("DOMContentLoaded", () =>{
    // Get method form DOM
    const content = {
        np: '<p><strong>NP Membership:</strong> No fee. Suitable for non-profit organizations.</p>',
        bronze: '<p><strong>Bronze Membership:</strong> Basic benefits including event discounts.</p>',
        silver: '<p><strong>Silver Membership:</strong> Includes training and advertising opportunities.</p>',
        gold: '<p><strong>Gold Membership:</strong> All benefits including spotlight positions on the homepage and special events.</p>'
    };

    const dialog = document.getElementById('myDialog');
    const dialogContent = document.getElementById('dialogContent');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    const select = document.getElementById('membership-level');

    document.getElementById('timestamp').value = new Date().toISOString();
    

    // Show the dialog when this is selected
    select.addEventListener('change', () => {
        const selectedValue = select.value;
        dialogContent.innerHTML = content[selectedValue] || '<p>No content selected available for this selection.</p>';
        dialog.showModal();
    });
    
    //Close dialog
    closeDialogBtn.addEventListener('click', (event) => {
        event.preventDefault();        
        dialog.close();
    });
    
    const form = document.getElementById('form-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            organizationTitle: document.getElementById('organization-title').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            membershipLevel: document.getElementById('membership-level').value,
            description: document.getElementById('description').value,
            timestamp: document.getElementById('timestamp').value,
        };

        localStorage.setItem('formData', JSON.stringify(formData));
        window.location.href = 'thankyou.html';
    });

});