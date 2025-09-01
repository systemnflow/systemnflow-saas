// Automatically update the copyright year in the footer
document.getElementById('y').textContent = new Date().getFullYear();

// Handle the email newsletter form
const form = document.querySelector('.newsletter-form');
const success = document.querySelector('.success');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page from reloading

    // Optional: you could validate or save the email here

    // Hide form and show success message
    form.style.display = 'none';
    success.style.display = 'block';
  });

  // Make sure the success message is hidden when the page loads
  success.style.display = 'none';
}
