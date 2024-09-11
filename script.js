document.querySelector('.signin .content .form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const usernameInput = document.querySelector('.signin .content .form .inputBox input[type="text"]');
  const passwordInput = document.querySelector('.signin .content .form .inputBox input[type="password"]');
  const submitButton = document.querySelector('.signin .content .form .inputBox input[type="submit"]');
  const spinner = document.querySelector('.spinner'); // Get the spinner element

  // Clear previous error messages
  document.querySelectorAll('.error-message').forEach(el => el.remove());

  // Validate username
  let isValid = true;
  if (!usernameInput.value || !/\S+@\S+\.\S+/.test(usernameInput.value)) {
      const error = document.createElement('p');
      error.textContent = 'Please enter a valid email address.';
      error.classList.add('error-message');
      usernameInput.parentElement.appendChild(error);
      isValid = false;
  }

  // Validate password
  if (!passwordInput.value || passwordInput.value.length < 6) {
      const error = document.createElement('p');
      error.textContent = 'Password must be at least 6 characters long.';
      error.style.color = 'red';
      error.classList.add('error-message');
      passwordInput.parentElement.appendChild(error);
      isValid = false;
  }

  // If form is valid, simulate API call
  if (isValid) {
      // Show the spinner
      spinner.style.display = 'block';

      // Simulating API call
      fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: usernameInput.value,
              password: passwordInput.value
          })
      })
      .then(response => response.json())
      .then(data => {
          // Hide the spinner
          spinner.style.display = 'none';

          // Display success message
          const message = document.createElement('div');
          message.textContent = 'Login successful!';
          message.style.color = 'green';
          document.querySelector('.signin .content').appendChild(message);
      })
      .catch(error => {
          // Hide the spinner
          spinner.style.display = 'none';

          // Display error message
          const message = document.createElement('div');
          message.textContent = 'Login failed. Please try again.';
          message.style.color = 'red';
          document.querySelector('.signin .content').appendChild(message);
      });
  }
});
