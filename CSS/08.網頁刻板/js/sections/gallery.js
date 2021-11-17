const body = document.querySelector('.gallery_body');
const moveBoxes = document.querySelectorAll('.gallery_itemMoveBox');
const btns = document.querySelectorAll('.gallery_filterBtns button');
const allBtn = document.querySelector('#filterBtn_allBtn');
const eventBtn = document.querySelector('#filterBtn_eventBtn');
const classBtn = document.querySelector('#filterBtn_classBtn');
const activitiesBtn = document.querySelector('#filterBtn_activitiesBtn');
const teachingBtn = document.querySelector('#filterBtn_teachingBtn');

arrangeBox();

window.addEventListener('resize', () => {
  arrangeBox();
});

// btn click event

allBtn.onclick = () => {
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('filterBtn-active');
  }

  allBtn.classList.add('filterBtn-active');

  for (let i = 0; i < moveBoxes.length; i++) {
    moveBoxes[i].classList.remove('gallery_itemMoveBox-hidden');
  }

  arrangeBox();
};

// ******** function ********

function arrangeBox() {
  // getComputedStyle 取值時會受到transition干擾，要先關掉
  for (let i = 0; i < moveBoxes.length; i++) {
    moveBoxes[i].style.transition = '';
  }
  const moveBoxesNow = document.querySelectorAll('.gallery_body > div:not(.gallery_itemMoveBox-hidden)');
  const moveBoxHeight = parseInt(getComputedStyle(moveBoxesNow[0]).height);
  for (let i = 0; i < moveBoxes.length; i++) {
    moveBoxes[i].style.transition = '0.5s';
  }

  console.log(moveBoxHeight);
  console.log(window.innerWidth);
  let floor = 0;

  if (window.innerWidth >= 992) {
    for (let i = 0; i < moveBoxesNow.length; i++) {
      moveBoxesNow[i].style.top = floor * moveBoxHeight + 'px';

      if (i % 3 === 0) {
        moveBoxesNow[i].style.left = '0';
      } else if (i % 3 === 1) {
        moveBoxesNow[i].style.left = '33.333%';
      } else {
        moveBoxesNow[i].style.left = '66.666%';
        floor++;
      }
    }

    body.style.height = moveBoxHeight * floor + 'px';
  } else if (window.innerWidth >= 768) {
    for (let i = 0; i < moveBoxesNow.length; i++) {
      moveBoxesNow[i].style.top = floor * moveBoxHeight + 'px';

      if (i % 2 === 0) {
        moveBoxesNow[i].style.left = '0';
      } else {
        moveBoxesNow[i].style.left = '50%';
        floor++;
      }
    }

    body.style.height = moveBoxHeight * floor + 'px';
  } else {
    for (let i = 0; i < moveBoxesNow.length; i++) {
      moveBoxesNow[i].style.left = '0';
      moveBoxesNow[i].style.top = `${i * moveBoxHeight}px`;
    }

    body.style.height = moveBoxHeight * moveBoxesNow.length + 'px';
  }
}
