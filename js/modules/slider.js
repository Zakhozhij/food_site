import {getZero} from './../services/services'

function slider({container,slide,nexArrow,prevArrow,totalCounter,currentCounter,wrapper,field}) {
  const prev = document.querySelector(prevArrow),
    next = document.querySelector(nexArrow),
    currentSlide = document.querySelector(currentCounter),
    totalSlide = document.querySelector(totalCounter),
    slides = document.querySelectorAll(slide),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(container);

  let slideIndex = 1;
  let offset = 0;

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = ` position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;`;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;`;
    if (i == slideIndex - 1) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    showSlides(++slideIndex);
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    showSlides(--slideIndex);
  });

  totalSlide.innerHTML = getZero(slides.length);
  showSlides(slideIndex);

  function showSlides(i) {
    if (i > slides.length) {
      slideIndex = 1;
    }

    if (i < 1) {
      slideIndex = slides.length;
    }
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
    currentSlide.innerHTML = getZero(slideIndex);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;

      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      showSlides(slideIndex);
    });
  });
  // showSlides(slideIndex);
  // totalSlide.innerHTML = getZero(slides.length);

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });

  // function showSlides(i) {
  //   if (i > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (i < 1) {
  //     slideIndex = slides.length;
  //   }
  //   currentSlide.innerHTML = getZero(slideIndex);

  //   slides.forEach((item) => (item.style.display = "none"));
  //   slides[slideIndex - 1].style.display = "block";
  // }
  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }
}

export default slider;