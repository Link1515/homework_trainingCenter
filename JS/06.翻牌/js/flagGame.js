let stage = 0;
let cardLength = 0;
let isMatching = false;
const countryNameData = ['台灣<br>Taiwan', '美國<br>America', '加拿大<br>Canada'];

$('#startBtn').on('click', function () {
  $('#info').hide();
  $('#game').show();

  cardCreate(stage);
});

// 產生卡片 & 綁定事件
function cardCreate(stage) {
  // 等級難度
  if (stage < 1) {
    cardLength = 3;
  } else {
    cardLength = 6;
  }

  for (let i = 0; i < cardLength; i++) {
    // 上方旗幟卡片生成
    $('.upper-box').append(`
      <div class="flag" data-cardID="${i}">
        <div class="back"></div>
        <div class="front"></div>
      </div>
    `);
    $('.flag .front').eq(i).css('background-image', `url(./images/${stage}_${i}.png)`);

    // 下方國名卡片生成
    $('.lower-box').append(`
      <div class="countryName" data-cardID="${i}">
        <div class="back"></div>
        <div class="front">${countryNameData[i]}</div>
      </div>
    `);
  }

  // 洗牌
  for (let i = 0; i < cardLength; i++) {
    const randNum = Math.round(Math.random() * 2);
    $('.flag').eq(i).insertAfter($('.flag').eq(randNum));
    $('.countryName').eq(randNum).insertAfter($('.countryName').eq(i));
  }

  // 卡片點擊事件
  $('.flag').on('click', function () {
    if (!$('.flag').hasClass('open-flag')) {
      $(this).addClass('open-flag');
    }

    if (!isMatching) {
      cardMatch();
    }
  });

  $('.countryName').on('click', function () {
    if (!$('.countryName').hasClass('open-countryName')) {
      $(this).addClass('open-countryName');
    }

    if (!isMatching) {
      cardMatch();
    }
  });
}

// 卡片配對判斷
function cardMatch() {
  if ($('.open-flag').length && $('.open-countryName').length) {
    // 正在配對
    isMatching = true;

    if ($('.open-flag').attr('data-cardID') === $('.open-countryName').attr('data-cardID')) {
      $('.open-flag').addClass('OK').off();
      $('.open-countryName').addClass('OK').off();
      $('.open-flag div').fadeTo(800, 0);
      $('.open-countryName div').fadeTo(1000, 0);

      // 插入解決的卡片
      $('#solved').append(`
      <div class="solved-card">
        <div class="front">
          <div style="background-image: url(./images/${stage}_${$('.open-flag').attr('data-cardID')}.png)"></div>
          <p>${$('.open-countryName .front').html()}</p>
        </div>
        <div class="back"></div>
      </div>
      `);
      setTimeout(function () {
        $('.solved-card').addClass('turnFront');
        $('.solved-card .front').fadeTo(1000, 1);
      }, 0);
    }
    setTimeout(function () {
      $('.flag').removeClass('open-flag');
      $('.countryName').removeClass('open-countryName');
      isMatching = false;

      // 判斷是否過關
      if ($('.turnFront').length === cardLength) {
        // stage++;
        $('.nextStageInfo').show();
      }
    }, 1000);
  }
}
