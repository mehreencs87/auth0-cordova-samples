document.addEventListener('deviceready',function() {
var lock = new Auth0Lock(
  'YOUR_CLIENT_ID',
  'YOUR_AUTH0_DOMAIN'
);



 $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.show();
    });
// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});


var token = localStorage.getItem('accessToken');
if (token) {
  showLoggedIn();
}

// Display the user's profile
function showLoggedIn() {
  var profile = JSON.parse(localStorage.getItem('profile'));
  document.getElementById('nick').textContent = profile.nickname;
}

}, false);
