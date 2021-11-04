// 主選單
const menu = document.querySelector('.menu');
const toggleBtn = document.querySelector('.toggle-button');
const menuHeight = document.querySelectorAll('.menu li').length * 30 + 20;

toggleBtn.onclick = () => {
  if (menu.style.height === '0px') {
    menu.style.height = menuHeight + 'px';
  } else {
    menu.style.height = '0px';
  }
};

// 次選單
const subToggleBtn = document.querySelectorAll('.menu .fa-plus');

subToggleBtn.onclick = () => {};
