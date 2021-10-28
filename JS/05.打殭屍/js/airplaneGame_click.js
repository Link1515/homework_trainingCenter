let score = 0;
let clock = 60;
let mouseX = 0;
let mouseY = 0;
let fireTimer = 0;
let highScore_plane = 0;

$('#startBtn').on('click', gameStart);

// block移動動畫
function moveBlock(id) {
  $(`#block${id}`).animate(
    {
      left: rand($('.box').width() - 50) + 'px',
      top: rand(250) + 'px',
    },
    3000,
    function () {
      moveBlock(id);
    }
  );
}

// 取隨機數
function rand(num) {
  return Math.round(Math.random() * num);
}

// 子彈發射函數
function trigger() {
  $(`<div class="bullet" style="left: ${mouseX - 15}px; top: ${mouseY - 80}px"></div>`)
    .appendTo('.box')
    .animate(
      {
        top: '-=1000px',
      },
      1500,
      'linear'
    );
  console.log('hi');
}

// 取出本地高分
if (localStorage.getItem('highScore')) {
  highScore_plane = localStorage.getItem('highScore');
  $('.highScore span').text(highScore_plane);
} else {
  $('.highScore').css('display', 'none');
}

// 遊戲開始
function gameStart() {
  $('#startBtn').css('display', 'none');
  $('.planeArea').addClass('boundary');
  $('.highScore').css('display', 'none');

  // reset
  clock = 0;
  score = 0;
  $('#score').text(score);

  let blockId = 0;

  // block產生
  const blockTimer = setInterval(function () {
    if ($('.block').length < 10) {
      for (let i = 0; i < rand(5); i++) {
        $(
          `<div class="block" id="block${blockId}" style="left: ${rand($('.box').width() - 50)}px; top: ${rand(
            250
          )}px"></div>`
        ).appendTo('.box');
        moveBlock(blockId);
        blockId++;
      }
    }
  }, 800);

  // 滑鼠控制飛機砲彈
  $('.planeArea').on('mousemove', function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY + 355;
  });

  $('.planeArea').on('click', trigger);

  // $('.planeArea').on('mouseenter', trigger);

  // $('.planeArea').on('mouseleave', function () {
  //   clearInterval(fireTimer);
  // });

  // 判斷子彈是否打到block
  const deterTimer = setInterval(() => {
    if ($('.bullet') && $('.block')) {
      $('.bullet').each(function () {
        let bulletTop = $(this).offset().top;
        let bulletLeft = $(this).offset().left;
        let _bullet = $(this);

        $('.block').each(function () {
          let blockTop = $(this).offset().top;
          let blockLeft = $(this).offset().left;
          let _block = $(this);

          if (
            bulletTop < blockTop + _block.height() &&
            bulletLeft + _block.width() > blockLeft &&
            bulletLeft < blockLeft + _block.width() &&
            !_block.hasClass('boom')
          ) {
            _block
              .addClass('boom')
              .css('background', "url('./images/boom.png') no-repeat center / cover")
              .stop()
              .animate(
                {
                  opacity: 0,
                },
                300,
                function () {
                  _block.remove();
                }
              );
            _bullet.remove();
            score++;
            $('#score').text(score);
          }
        });
        if (_bullet.offset().top < 0) {
          _bullet.remove();
        }
      });
    }
  }, 10);

  const timer = setInterval(function () {
    clock++;
    $('.countdown span').css('right', `${($('.countdown').width() * clock) / 200}px`);

    if (clock > 200) {
      clearInterval(timer);
      clearInterval(deterTimer);
      clearInterval(blockTimer);
      // clearInterval(fireTimer);

      $('.highScore').css('display', 'block');
      $('.planeArea').removeClass('boundary');
      $('.planeArea').off();
      $('.block').remove();
      $('#startBtn').css('display', 'block');

      if (score > highScore_plane) {
        highScore_plane = score;
        $('.highScore span').text(highScore_plane);
        localStorage.setItem('highScore', highScore_plane);
      }
    }
  }, 100);
}
