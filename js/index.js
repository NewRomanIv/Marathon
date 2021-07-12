import menu from "./menu.js";
import textAbout from "./text.js";

let wrapper = document.querySelectorAll("#wrapper div");
let nav = document.querySelector("nav");
let navCollectin = document.querySelectorAll("nav a");

let objContent = {
  0: viewAboutMrafon(),
  1: viewAboutMe(),
  2: viewMenu(),
};

let contakt = document.querySelector("header a");
let modalRef = document.querySelector(".js-lightbox");
let btnClose = document.querySelector(`button[data-action="close-lightbox"]`);

navCollectin[0].classList.add("selected");

document.addEventListener("DOMContentLoaded", load);

nav.addEventListener("click", setContent);

//загрузка элементов на страницу
function load() {
  wrapper.forEach((element, index) => {
    element.insertAdjacentHTML("beforeend", objContent[index]);
  });
}

function viewAboutMrafon() {
  return `<article>
            <p>${textAbout.marafom}</p>
          </article>`;
}

function viewAboutMe() {
  return `<article>
            <img src="./img/myFoto.jpg" alt="Мое фото" />
            <p>${textAbout.me}</p>
          </article>`;
}

function viewMenu() {
  return menu
    .map((element) => {
      return `<article>
                <h2>${element.dayOfWeek} <span>(${element.date})</span></h2>
                <img
                    src="${element.image}"
                    alt="${element.breakfName}"
                    title="${element.breakfName}"/>
                    <h3>Завтрак: ${element.breakfName}</h3>
                <p>${element.breakfDescr}</p>
                <h3>Обед: ${element.lunchName}</h3>
                <p>${element.lunchDescr}</p>
                <h3>Ужин: ${element.dinnerName}</h3>
                <p>${element.dinnerDescr}</p>
            </article>`;
    })
    .join("");
}

//отобразить основной контент
function setContent(event) {
  if (event.target.nodeName !== "A") return;
  event.preventDefault();
  if (event.target.classList.contains("selected")) return;

  navCollectin.forEach((item, index) => {
    if (item == event.target) {
      item.classList.add("selected");
      wrapper[index].classList.remove("hide");
    } else {
      item.classList.remove("selected");
      wrapper[index].classList.add("hide");
    }
  });
}

//модальное окно
//добавить класс CSS открытия модального окна
contakt.addEventListener("click", (event) => {
  event.preventDefault();
  modalRef.classList.add("is-open");
});

//удалить класс открытия модального окна по кнопке
btnClose.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") modalRef.classList.remove("is-open");
});

//удалить класс открытия модального окна по бэкдроп
modalRef.addEventListener("click", (event) => {
  // console.log(event.currentTarget.nodeName);
  if (event.target.nodeName === "DIV") modalRef.classList.remove("is-open");
});

//события нажатия клавиш
window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") modalRef.classList.remove("is-open");
});
