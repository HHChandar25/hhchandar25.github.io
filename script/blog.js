let currentIndex = 0;
const slides = document.querySelectorAll('.blog-post');
const totalSlides = slides.length;
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('carousel-dots');
let autoPlayInterval;

function initCarousel() 
{
  createDots();
  updateCarousel();
  bindEvents();
  startAutoPlay();
}

function createDots() 
{
  for (let i = 0; i < totalSlides; i++) 
  {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function bindEvents() 
{
  prevBtn.addEventListener('click', previousSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Pause auto-play on hover
  track.addEventListener('mouseenter', pauseAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
}

function updateCarousel() 
{
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => 
  {
    dot.classList.toggle('active', index === currentIndex);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === totalSlides - 1;

  animateCurrentSlide();
}

function animateCurrentSlide() 
{
  const currentSlide = slides[currentIndex];
  const content = currentSlide.querySelector('.post-content');
  const image = currentSlide.querySelector('.post-image');

  if (content && image) 
  {
    content.style.animation = 'none';
    image.style.animation = 'none';


    content.style.animation = 'slideInContent 0.8s ease-out forwards';
    image.style.animation = 'scaleIn 0.8s ease-out 0.3s forwards';
  }
}

function goToSlide(index) 
{
  if (index >= 0 && index < totalSlides) 
  {
    currentIndex = index;
    updateCarousel();
  }
}

function nextSlide() 
{
  if (currentIndex < totalSlides - 1) 
  {
    currentIndex++;
    updateCarousel();
  }
}

function previousSlide() 
{
  if (currentIndex > 0) 
  {
    currentIndex--;
    updateCarousel();
  }
}

function startAutoPlay() {
  pauseAutoPlay();
  autoPlayInterval = setInterval(() => 
  {
    if (currentIndex < totalSlides - 1) 
    {
      nextSlide();
    } 
    else
    {
      goToSlide(0); // Loop back to first slide
    }
  }, 8000);
}

function pauseAutoPlay() 
{
  if (autoPlayInterval) 
  {
    clearInterval(autoPlayInterval);
  }
}

document.addEventListener('DOMContentLoaded', initCarousel);

document.addEventListener('keydown', (e) => 
{
  if (e.key === 'ArrowLeft') 
  {
    prevBtn.click();
  }
  else if (e.key === 'ArrowRight') 
  {
    nextBtn.click();
  }
});
