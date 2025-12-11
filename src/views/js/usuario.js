document.addEventListener('DOMContentLoaded', () => {
    const tabHistory = document.getElementById('tab-history');
    const tabLogin = document.getElementById('tab-login');
    const tabUpdate = document.getElementById('tab-update');
    const ordersContainer = document.querySelector('.orders-container');
    const userContainer = document.querySelector('.user-container');
    const updateContainer = document.querySelector('.update-container');

    function showContainer(containerToShow, buttonToActivate) {
        // Hide all containers
        ordersContainer.style.display = 'none';
        userContainer.style.display = 'none';
        updateContainer.style.display = 'none';

        // Deactivate all buttons
        tabHistory.classList.remove('active');
        tabLogin.classList.remove('active');
        tabUpdate.classList.remove('active');

        // Show the selected container
        containerToShow.style.display = 'flex'; // Assuming flex for layout

        // Activate the selected button
        buttonToActivate.classList.add('active');
    }

    // Event Listeners
    tabHistory.addEventListener('click', () => {
        showContainer(ordersContainer, tabHistory);
    });

    tabLogin.addEventListener('click', () => {
        showContainer(userContainer, tabLogin);
    });
    
    tabUpdate.addEventListener('click', () => {
        showContainer(updateContainer, tabUpdate);
    });

    // Initial state: Show user-container by default
    showContainer(ordersContainer, tabHistory);
});
