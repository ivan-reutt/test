$(document).ready(function () {

  $('.burger-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.nav_wrap').toggleClass('active');
    $('body').toggleClass('fixed');
  });

  $('.call__request').on('click', function () {
    $('.modal').toggleClass('active');
    $('body').toggleClass('fixed');
  })

  $('.close').on('click', function () {
    $('.modal').toggleClass('active');
    $('body').toggleClass('fixed');
  })


  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27 && $('body').hasClass('fixed') && $('.modal').hasClass('active')) {
      $('.modal').toggleClass('active');
      $('body').toggleClass('fixed');
    }
  });

  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27 && $('body').hasClass('fixed') && $('.burger-menu').hasClass('active')) {
      $('.burger-menu').toggleClass('active');
      $('.nav_wrap').toggleClass('active');
      $('body').toggleClass('fixed');
    }
  });

  $('.owl-carousel').owlCarousel({
    center: true,
    loop: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      992: {
        items: 3,
        margin: -250,
        autoWidth: true
      }
    }
  });

  $('[data-fancybox]').fancybox();



  var list = document.getElementsByClassName('collapse__item');

  for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-image-src');
    list[i].style.backgroundImage = "url('" + src + "')";
  }

  $('.collapse__btn').on('click', function () {
    $('.collapse__item_hide').toggleClass('show')
  })


});
