let count = 0;
let clock = 60;

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

// 遊戲開始
function gameStart() {
  let fireTimer = 0;
  let mouseX = 0;
  let mouseY = 0;
  let blockId = 0;

  // block產生
  const blockTimer = setInterval(function () {
    $(
      `<div class="block" id="block${blockId}" style="left: ${rand($('.box').width() - 50)}px; top: ${rand(
        250
      )}px"></div>`
    ).appendTo('.box');
    moveBlock(blockId);
    blockId++;
  }, 500);

  // 滑鼠控制飛機砲彈
  $('.box').on('mousemove', function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  });

  $('.box').on('mouseenter', function () {
    fireTimer = setInterval(() => {
      $(`<div class="bullet" style="left: ${mouseX - 15}px; top: ${mouseY - 80}px"></div>`)
        .appendTo('.box')
        .animate(
          {
            top: '-=1000',
          },
          {
            specialEasing: {
              top: 'linear',
            },
          }
        );
    }, 500);
  });

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
            bulletTop < blockTop &&
            bulletLeft + _block.width() > blockLeft &&
            bulletLeft < blockLeft + _block.width()
          ) {
            _block.remove();
            _bullet.remove();
          }
        });
        if (_bullet.offset().top < 0) {
          _bullet.remove();
        }
      });
    }
  }, 10);
}
