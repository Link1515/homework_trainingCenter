const contactInfo = document.querySelector('.nav_contactInfo');
const main = document.querySelector('.nav_main');
let menuListHeight = parseInt(getComputedStyle(document.querySelector('.nav_menu a')).height);
const menu = document.querySelector('.nav_menu');
const toggleBtn = document.querySelector('.nav_toggleBtn');
const menuHeight = document.querySelectorAll('.nav_menu>ul>li').length * menuListHeight + 20;
const subToggleBtn = document.querySelectorAll('.nav_menu .fa-plus');
const subMenu = document.querySelectorAll('.nav_menuList-hasSubMenu');

// 主選單
toggleBtn.onclick = () => {
  if (!toggleBtn.classList.contains('nav_toggleBtn-active')) {
    menu.style.height = menuHeight + 'px';
    toggleBtn.classList.add('nav_toggleBtn-active');
  } else {
    toggleBtn.classList.remove('nav_toggleBtn-active');
    menu.style.height = '0px';
    for (let i = 0; i < subToggleBtn.length; i++) {
      subToggleBtn[i].classList.replace('fa-minus', 'fa-plus');
      const subMenu = subToggleBtn[i].parentElement.nextElementSibling;
      subMenu.style.height = '0px';
    }
  }
};

// 次選單
for (let i = 0; i < subToggleBtn.length; i++) {
  subToggleBtn[i].onclick = (e) => {
    const subMenu = e.target.parentElement.nextElementSibling;
    const subMenuHeight = subMenu.querySelectorAll('li').length * menuListHeight;

    console.log(subMenuHeight);

    if (subMenu.style.height === '' || subMenu.style.height === '0px') {
      subMenu.style.height = subMenuHeight + 'px';
      menu.style.height = parseInt(menu.style.height) + subMenuHeight + 'px';
      e.target.classList.replace('fa-plus', 'fa-minus');
    } else {
      subMenu.style.height = '0px';
      menu.style.height = parseInt(menu.style.height) - subMenuHeight + 'px';
      e.target.classList.replace('fa-minus', 'fa-plus');
    }
  };
}

// 滾動事件
window.onscroll = () => {
  if (document.documentElement.scrollTop > 0) {
    contactInfo.style.height = '0px';
    main.style.backgroundColor = '#ff4b2b';
  } else {
    contactInfo.style.height = '';
    main.style.backgroundColor = '';
  }
};

// 視窗大小改變，修正nav
window.onresize = () => {
  menuListHeight = parseInt(getComputedStyle(document.querySelector('.nav_menu a')).height);

  if (window.innerWidth > 1200) {
    menu.style.height = '';
    for (let i = 0; i < subToggleBtn.length; i++) {
      const subMenu = subToggleBtn[i].parentElement.nextElementSibling;
      subMenu.style.height = '';
    }
  } else {
    if (toggleBtn.classList.contains('nav_toggleBtn-active')) {
      menu.style.height = menuHeight + 'px';
      for (let i = 0; i < subToggleBtn.length; i++) {
        const subMenu = subToggleBtn[i].parentElement.nextElementSibling;
        subMenu.style.height = '0px';
        subToggleBtn[i].classList.replace('fa-minus', 'fa-plus');
      }
    }
  }
};
