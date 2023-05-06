
function calculator() {
  const result = document.querySelector(".calculating__result span");
  let height, weight, age, sex, ratio;

  height = setDefaultValues("height", "");
  weight = setDefaultValues("weight", "");
  age = setDefaultValues("age", "");
  sex = setDefaultValues("sex", "female");
  ratio = setDefaultValues("ratio", "1.375");

  function setDefaultValues(element, defaultValue) {
    if (!localStorage.getItem(element)) {
      localStorage.setItem(element, defaultValue);
    }
    return localStorage.getItem(element);
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector}`);
    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }
  function initInputSettings(selector) {
    document.querySelector(`#${selector}`).value =
      localStorage.getItem(selector);
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
  initInputSettings("height");
  initInputSettings("weight");
  initInputSettings("age");

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "_____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector}`);
    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", sex);
        }
        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/)) {
        input.style.border = "2px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          localStorage.setItem("height", height);
          break;
        case "weight":
          weight = +input.value;
          localStorage.setItem("weight", weight);
          break;
        case "age":
          age = +input.value;
          localStorage.setItem("age", age);
          break;
        default:
          break;
      }
      calcTotal();
    });
  }
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

export default calculator;