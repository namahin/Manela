// Wait for the window to load
window.addEventListener('load', function () {
    // Get the preloader element
    var preloader = document.querySelector('.preloader');

    // Hide the preloader when the window is fully loaded
    function hidePreloader() {
        preloader.style.display = 'none';
    }

    // Hide the preloader after a certain delay (in milliseconds)
    var delay = 3200; // Adjust this value as needed
    setTimeout(hidePreloader, delay);
});

// 
// 

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the tab buttons and content elements
    var tabButtons = document.querySelectorAll('.tab-btn li');
    var tabContentItems = document.querySelectorAll('.tab-content li');

    // Add click event listeners to each tab button
    tabButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            // Remove the 'active' class from all tab buttons and content items
            tabButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            tabContentItems.forEach(function (item) {
                item.style.display = 'none';
            });

            // Add the 'active' class to the clicked tab button
            button.classList.add('active');
            // Display the corresponding content item
            tabContentItems[index].style.display = 'block';
        });
    });

    // Activate the first tab button and content item by default
    tabButtons[0].click();
});