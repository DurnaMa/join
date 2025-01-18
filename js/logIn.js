function guestLogin() {
  sessionStorage.setItem('username', 'Guest');
  window.location.href = '../pages/summary.html';
}
