// Find the Swiper container in our HTML, and initialize a new Swiper slider with it
const swiper = new Swiper('.review-slider', {

  // This ensures the slider slides horizontally (which is the default, but good to know)
  direction: 'horizontal',

  // This makes the slider loop back to the beginning when it reaches the end
  loop: true,

  // This adds a "grab" hand icon when you hover over the slider
  grabCursor: true,

  // This adds space between each slide
  spaceBetween: 30,

  // This connects the pagination dots to the slider
  pagination: {
    el: '.swiper-pagination', // The CSS selector for our pagination container
    clickable: true,          // This makes the dots clickable
  },

  // Responsive breakpoints: This is how we change the number of slides shown on different screen sizes
  breakpoints: {
    // When window width is >= 640px (small tablets)
    640: {
      slidesPerView: 1, // Show 1 slide
    },
    // When window width is >= 768px (tablets)
    768: {
      slidesPerView: 2, // Show 2 slides
    },
    // When window width is >= 1024px (laptops/desktops)
    1024: {
      slidesPerView: 3, // Show 3 slides
    },
  },
});