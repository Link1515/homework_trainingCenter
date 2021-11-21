const totalTeacher = document.querySelector('.odometer_totalTeacher');
const schoolBus = document.querySelector('.odometer_schoolBus');
const ourCourse = document.querySelector('.odometer_ourCourse');
const awardWinner = document.querySelector('.odometer_awardWinner');

window.addEventListener('scroll', () => {
  if (window.pageYOffset >= 8360) {
    totalTeacher.innerHTML = 1500;
    schoolBus.innerHTML = 4500;
    ourCourse.innerHTML = 5500;
    awardWinner.innerHTML = 6500;
  }
});
