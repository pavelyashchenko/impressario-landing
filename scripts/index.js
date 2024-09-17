const initIPLocation = () => {
  if (window.location.hostname !== 'localhost') {
    fetch('https://ipapi.co/json/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const countryCode = data.country_code;
        const currentPath = window.location.pathname;

        if (countryCode === 'FR' && currentPath !== './fr.html') {
          window.location.href = './fr.html';
        } else if (countryCode !== 'FR' && currentPath !== './index.html') {
          window.location.href = './index.html';
        }
      })
      .catch(error => {
        console.error('Error getting IP location:', error);
        if (window.location.pathname !== './index.html') {
          window.location.href = './index.html';
        }
      });
  } else {
    console.log('Geolocation not required on localhost');
  }
};

document.addEventListener('DOMContentLoaded', function() {
  initIPLocation();

  if (window.innerWidth > 600) {
    new WOW().init();
  }
});