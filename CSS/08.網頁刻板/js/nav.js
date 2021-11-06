const menuListHeight = parseInt(getComputedStyle(document.querySelector('.nav_menu a')).height);
const menu = document.querySelector('.nav_menu');
const toggleBtn = document.querySelector('.nav_toggleBtn');
const menuHeight = document.querySelectorAll('.nav_menu>ul>li').length * menuListHeight + 20;
const subToggleBtn = document.querySelectorAll('.nav_menu i');

// 主選單
toggleBtn.onclick = () => {
  if (menu.style.height === '' || menu.style.height === '0px') {
    menu.style.height = menuHeight + 'px';
    toggleBtn.classList.add('active');
  } else {
    toggleBtn.classList.remove('active');
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
    const subMenuHeight = subMenu.children.length * menuListHeight;

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
