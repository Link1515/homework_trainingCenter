const allBtn = document.getElementById('filterBtn_allBtn');
const eventBtn = document.getElementById('filterBtn_eventBtn');
const classBtn = document.getElementById('filterBtn_classBtn');
const activitiesBtn = document.getElementById('filterBtn_activitiesBtn');
const teachingBtn = document.getElementById('filterBtn_teachingBtn');
const items = document.querySelectorAll('.gallery_item');
const btns = allBtn.parentElement;

let reg = '';

allBtn.onclick = function () {
  removeBtnActive();
  this.classList.add('filterBtn-active');

  for (let i = 0; i < items.length; i++) {
    items[i].style.display = '';
    setTimeout(() => {
      items[i].classList.remove('gallery_item-hidden');
    }, 0);
  }
};

eventBtn.onclick = function () {
  reg = /event/;

  removeBtnActive();
  this.classList.add('filterBtn-active');

  filterFun(reg);
};

classBtn.onclick = function () {
  reg = /class/;

  removeBtnActive();
  this.classList.add('filterBtn-active');

  filterFun(reg);
};

activitiesBtn.onclick = function () {
  reg = /activities/;

  removeBtnActive();
  this.classList.add('filterBtn-active');

  filterFun(reg);
};

teachingBtn.onclick = function () {
  reg = /teaching/;

  removeBtnActive();
  this.classList.add('filterBtn-active');

  filterFun(reg);
};

// ****** function ******

function removeBtnActive() {
  for (let i = 0; i < btns.childElementCount; i++) {
    btns.children[i].classList.remove('filterBtn-active');
  }
}

function filterFun(reg) {
  for (let i = 0; i < items.length; i++) {
    if (reg.test(items[i].dataset.type)) {
      items[i].style.display = '';
      setTimeout(() => {
        items[i].classList.remove('gallery_item-hidden');
      }, 0);
    } else {
      items[i].classList.add('gallery_item-hidden');
      setTimeout(() => {
        items[i].style.display = 'none';
      }, 500);
    }
  }
}
