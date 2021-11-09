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
  count++;
  count %= item.length;

  // 設置過渡圖片
  if (transitionPic) {
    transitionPic.classList.remove('banner_item-cloned-z5');
  }
  transitionPic = document.querySelector(`#item-cloned-${count}`);
  transitionPic.classList.add('banner_item-cloned-z5');

  // 漸淡
  item[current].style.opacity = '0';

  setTimeout(() => {
    item[current].style.opacity = '1';
    main.style.left = `-${count * 100}vw`;
  }, 500);
};

prevBtn.onclick = () => {
  count--;
  if (count < 0) {
    count = item.length - 1;
  }

  main.style.left = `-${count * 100}vw`;
};
