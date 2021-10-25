let count = 0;
let clock = 60;
let mouseX = 0;
let mouseY = 0;
let fireTimer = 0;

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
  fireTimer = setInterval(() => {
    $(`<div class="bullet" style="left: ${mouseX - 15}px; top: ${mouseY - 80}px"></div>`)
      .appendTo('.box')
      .animate(
        {
          top: '-=1000px',
        },
        {
          specialEasing: {
            top: 'linear',
          },
        }
      );
  }, 500);
}

// 遊戲開始
function gameStart() {
  $('#startBtn').css('display', 'none');

  // reset
  clock = 10;
  count = 0;
  $('#score').text(count);

  let blockId = 0;

  // block產生
  const blockTimer = setInterval(function () {
    if ($('.block').length < 10) {
      for (let i = 0; i < rand(3); i++) {
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
  $('.box').on('mousemove', function (e) {
    mouseX = e.offsetX;
    if (e.target.classList.contains('box')) {
      mouseY = e.offsetY;
    } else {
      mouseY = e.offsetY + 352;
    }
    // mouseY = e.offsetY + 355;

    console.log(e.target);
  });

  trigger();

  $('.box').on('mouseenter', trigger);

  $('.box').on('mouseleave', function () {
    clearInterval(fireTimer);
  });

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
            bulletLeft < blockLeft + _block.width()
          ) {
            _block.remove();
            _bullet.remove();
            count++;
            $('#score').text(count);
          }
        });
        if (_bullet.offset().top < 0) {
          _bullet.remove();
        }
      });
    }
  }, 10);

  const timer = setInterval(function () {
    clock--;
    // console.log(clock);
    if (clock === 0) {
      clearInterval(timer);
      clearInterval(deterTimer);
      clearInterval(blockTimer);
      clearInterval(fireTimer);
      $('.box').off();
      $('.block').remove();
      $('#startBtn').css('display', 'block');
    }
  }, 1000);
}
