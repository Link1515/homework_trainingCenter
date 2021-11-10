const nextBtn = document.querySelector('.banner_nextBtn');
const prevBtn = document.querySelector('.banner_prevBtn');
const box = document.querySelector('.banner_box');
const main = document.querySelector('.banner_main');
const item = document.querySelectorAll('.banner_item');

let count = 0;
let transitionPic = '';

// 設置背景圖
for (let i = 0; i < item.length; i++) {
  item[i].style.background = `
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('./images/Banner_BestClass_Blog/${i}.jpg') no-repeat center / cover`;
}

// main最後插入首個item
main.insertAdjacentHTML(
  'beforeend',
  `
  <div class="banner_item banner_mainFirst-cloned" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('./images/Banner_BestClass_Blog/0.jpg') no-repeat center / cover">
        <div>
          <h1>${item[0].querySelector('h1').innerHTML}</h1>
          <p>
            ${item[0].querySelector('p').innerHTML}
          </p>
          <button class="primary-btn">
            <a href="#">Contact Now</a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
`
);

// 插入過渡元素
for (let i = 0; i < item.length; i++) {
  box.insertAdjacentHTML(
    'beforeend',
    `
    <div class="banner_item banner_item-cloned" id="item-cloned-${i}" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('./images/Banner_BestClass_Blog/${i}.jpg') no-repeat center / cover">
      <div>
        <h1>${item[i].querySelector('h1').innerHTML}</h1>
        <p>
          ${item[i].querySelector('p').innerHTML}
        </p>
        <button class="primary-btn">
          <a href="#">Contact Now</a>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `
  );
}

// 左右按鈕
nextBtn.onclick = () => {
  let current = count;

  countSetting('++');
  fadeInOut(current);
};

prevBtn.onclick = () => {
  let current = count;

  countSetting('--');
  fadeInOut(current);
};

function countSetting(str) {
  if (str === '++') {
    count++;
    count %= item.length;
  } else if (str === '--') {
    count--;
    if (count < 0) {
      count = item.length - 1;
    }
  }
}

function fadeInOut(cur) {
  // 關閉 transition
  main.style.transition = '';

  // 設置過渡圖片
  if (transitionPic) {
    transitionPic.classList.remove('banner_item-cloned-z5');
  }
  transitionPic = document.querySelector(`#item-cloned-${count}`);
  transitionPic.classList.add('banner_item-cloned-z5');

  // 漸淡
  item[cur].style.opacity = '0';

  setTimeout(() => {
    item[cur].style.opacity = '1';
    main.style.left = `-${count * 100}vw`;
  }, 500);
}

// 觸控滑動
let touchStartPos = 0;
let touchNewPos = 0;

main.addEventListener('touchstart', (e) => {
  touchStartPos = e.touches[0].pageX;
  main.style.transition = '';
});

main.addEventListener('touchmove', (e) => {
  touchNewPos = e.touches[0].pageX;
  main.style.left = `calc(-${count * 100}vw - ${touchStartPos - touchNewPos}px)`;
});

main.addEventListener('touchend', () => {
  main.style.transition = 'left 0.5s';
  if (touchStartPos - touchNewPos > 0) {
    countSetting('++');
    main.style.left = `-${count * 100}vw`;
  } else {
    countSetting('--');
    main.style.left = `-${count * 100}vw`;
  }
});
