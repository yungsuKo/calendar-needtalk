let pageUrl = window.location.pathname;
let menuList = document.querySelectorAll('ul.navbar-nav li a');
console.log(pageUrl);
// if (pageUrl.indexOf('login') > -1) {
//   document.getElementById('login').classList.add('active');
// }
menuList.forEach((menu) => {
  menu.classList.remove('active');
  if (menu.getAttribute('href') === pageUrl) {
    menu.classList.add('active');
  }
});
