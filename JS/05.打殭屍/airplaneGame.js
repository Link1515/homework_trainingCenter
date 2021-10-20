let bulletNum = 0;
let fireTimer = 0;
let mouseX = 0;
let mouseY = 0;

// let gameTimer = setInterval(() => {
//   if ($('.bullet').offset()) {
//     console.log($('.bullet').offset().top);
//     if ($('.bullet').offset().top < 0) {
//       $('.bullet').remove();
//     }
//   }
// }, 100);

$('.box').on('mousemove', function (e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

$('.box').on('mouseenter', function (e) {
  fireTimer = setInterval(() => {
    $(`<div id="bullet${bulletNum}" class="bullet" style="left: ${mouseX - 15}px; top: ${mouseY - 80}px"></div>`)
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
  }, 50);
});

$('.box').on('mouseleave', function () {
  clearInterval(fireTimer);
});
