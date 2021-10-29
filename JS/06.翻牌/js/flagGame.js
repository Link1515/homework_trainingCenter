let stage = 0;
let cardLength = 0;
let isMatching = false;
// prettier-ignore
const countryNameData = [
  [
    '台灣<br>Taiwan', 
    '美國<br>America', 
    '加拿大<br>Canada'
  ],
  [
    '瑞典<br>Sweden', 
    '芬蘭<br>Finland', 
    '挪威<br>Norway', 
    '冰島<br>Iceland', 
    '丹麥<br>Denmark', 
    '瑞士<br>Switzerland'
  ],
  [
    '比利時<br>Belgium',
    '德國<br>Germany',
    '荷蘭<br>Netherlands',
    '法國<br>France',
    '義大利<br>Italy',
    '保加利亞<br>Bulgaria'
  ],
  [
    '馬利<br>Mali',
    '幾內亞<br>Guinea',
    '喀麥隆<br>Cameroon',
    '塞內加爾<br>Senegal',
    '奈及利亞<br>Nigeria',
    '查德<br>Chad'
  ]
];

// 遊戲開始按鈕
$('#startBtn').on('click', function () {
  $('#home').hide();
  $('#game').show();

  // 重設下一關按鈕
  $('#nextBtn').off();
  nextBtnFun();

  stage = 0;

  gameHtmlReset();
  cardCreate(stage);
});

// 再次挑戰按鈕
$('#replayBtn').on('click', function () {
  stage = 0;
  $('.finalInfo').hide();
  $('#game').show();

  // 重設下一關按鈕
  $('#nextBtn').off();
  nextBtnFun();

  gameHtmlReset();
  cardCreate(stage);
});

// 回首頁按鈕
$('#homeBtn').on('click', function () {
  $('.finalInfo').hide();
  $('#home').show();
});

function gameHtmlReset() {
  $('#solved').html('');
  $('.upper-box').html('');
  $('.lower-box').html('');
}

// 下一關按鈕函數
function nextBtnFun() {
  $('#nextBtn').on('click', function () {
    $('.nextStageInfo').hide();
    $(this).html('進入下一關');
    stage++;

    gameHtmlReset();
    cardCreate(stage);
  });
}

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
    $('.flag .front').eq(i).css('background-image', `url(./images/${stage}_${i}.gif)`);

    // 下方國名卡片生成
    $('.lower-box').append(`
      <div class="countryName" data-cardID="${i}">
        <div class="back"></div>
        <div class="front">${countryNameData[stage][i]}</div>
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
          <div style="background-image: url(./images/${stage}_${$('.open-flag').attr('data-cardID')}.gif)"></div>
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
        // 是否全部過完
        if (stage === 3) {
          $('#nextBtn').off();
          $('#nextBtn').html('挑戰成功!');
          $('#nextBtn').on('click', function () {
            $('.nextStageInfo').hide();
            $('#game').hide();
            $('.finalInfo').show();
          });
        }
        $('.nextStageInfo').show();
      }
    }, 1000);
  }
}
