// 主選單
const listHeight = parseInt(getComputedStyle(document.querySelector('.menu a')).height);
const menu = document.querySelector('.menu');
const toggleBtn = document.querySelector('.toggle-button');
const menuHeight = document.querySelectorAll('.menu>ul>li').length * listHeight + 20;

toggleBtn.onclick = () => {
  if (menu.style.height === '' || menu.style.height === '0px') {
    menu.style.height = menuHeight + 'px';
    toggleBtn.classList.add('active');
  } else {
    toggleBtn.classList.remove('active');
    menu.style.height = '0px';
  }
};

// 次選單
const subToggleBtn = document.querySelectorAll('.menu i');

for (let i = 0; i < subToggleBtn.length; i++) {
  subToggleBtn[i].onclick = (e) => {
    const subMenu = e.target.parentElement.nextElementSibling;
    const subMenuHeight = subMenu.children.length * listHeight;

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
