// Configuration keys.
let loader = true;
let sliderBorder = document.getElementsByClassName('slider-border')[0];
let sliderWrapper = document.getElementsByClassName('slider-wrapper')[0];
let childElements = sliderBorder.querySelectorAll('.slide-element').length;
let scrollDegree = (sliderBorder.scrollHeight)  / childElements;
let scrollValue = 0;
let scrollPx = 0
let preventScroll = true;
let slickNext = false;
// Add/Remove initial configuration here
initChecker();
initScroll();
clickEvents();
// **************************
// **************************
// **************************
// Add/Remove initial configuration
// **************************
// **************************
// **************************
function initChecker () {
    if(!loader) document.body.classList.add('loaded')
}

// **************************
// **************************
// **************************
// Loader
// **************************
// **************************
// **************************
setTimeout(()=> {
    // SaifKeralite(@Saifkeralite)
    document.body.classList.add('loaded' /*SaifKeralite(@Saifkeralite) */)
}, 4000)


function initScroll () {
   // Sc (1) : Slick Slider init. 
   $('.slider-border').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    vertical: true,
    infinite: true,
    arrows: false,
    draggable: false
  });

  $('.slick-active').addClass('active-animated-slick')
  // Sc (2) : On mouse wheel scroll.
  $('.slider-border').on('wheel', (e)=> {
    if(e.originalEvent.deltaY < 0) {
        slickNext = false;
        // Scroll Down
        $('.slider-border').slick('slickPrev')
    } else{
        slickNext = true;
        // Scroll Up
        $('.slider-border').slick('slickNext')
    }
  })
}

$('.slider-border').on('beforeChange', (e)=> {
  // Sc (3): Animation on each slide.
  let nextSlide = $(e.currentTarget).find('.slick-active').next();
  let prevSlide = $(e.currentTarget).find('.slick-active').prev();
  if(nextSlide.hasClass('slick-cloned')) console.log('it has slick cloned status')
  if(slickNext) {
    if(nextSlide.hasClass('slick-cloned')) {
      $(e.currentTarget).find('.slick-slide[data-slick-index=0]').addClass('active-animated-slick')
    } else{
      nextSlide.addClass('active-animated-slick')
    }
  } else {
    if(prevSlide.hasClass('slick-cloned')) {
      $(e.currentTarget).find(`.slick-slide[data-slick-index=${childElements - 1}]`).addClass('active-animated-slick')
    } else{
      prevSlide.addClass('active-animated-slick')
    }
  }
  $(e.currentTarget).find('.slick-active').removeClass('active-animated-slick')
});

function clickEvents () {
  $('.slide-element-img-highlight').click(e=> {
    $(e.target).parent().addClass('clicked')
  })

  $('.slider-border').on('afterChange', (e)=> {
    $('.slide-element-img-bg').removeClass('clicked')
  })

  $('.color-c').click(e=> {
    e.stopPropagation();
    let currentBodyClass = $('body').attr('class').split(' ').filter(e=> e !== 'loaded')[0]
    let getColorName = $(e.target).data('color-name')
    $('body').removeClass(currentBodyClass)
    $('body').addClass(getColorName)
  })
}