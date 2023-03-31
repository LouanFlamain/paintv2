var canva = document.getElementById("canvas");
var ctx = canva.getContext("2d");
var colorbody = document.getElementById("colorBody");
var rangeText = document.getElementById("range_text");
var textForm = document.getElementById("text_form");
var textInput = document.getElementById("text_input");
var textCancel = document.getElementById("text_cancel");

let mode = "";
let radioValue = "stroke";
let headColor = "#000000";
let rangeValue = 50;
let textIsActive = false;

var carre = document.getElementById("carre");
var rond = document.getElementById("rond");
var triangle = document.getElementById("triangle");
var cleanBtn = document.getElementById("clean");
var textBtn = document.getElementById("text");

var xPos = document.getElementById("x_pos");
var yPos = document.getElementById("y_pos");

var xTextPos;
var yTextPos;

//déclaration boutons navbar

var head = document.getElementById("color");

head.addEventListener("input", (e) => (headColor = e.target.value));

var range = document.getElementById("range_input");
range.addEventListener("input", (e) => {
  //console.log(e.target.value);
  rangeValue = Math.round(e.target.value);
  rangeText.textContent = "taille : " + rangeValue + " px";
});

var radios = document.querySelectorAll('input[type=radio][name="champs"]');
radios.forEach((radio) =>
  radio.addEventListener("change", () => {
    radioValue = radio.value;
    console.log(radio.value);
  })
);

var x = 0;
var y = 0;

let chooseChamp = () => {
  ctx.strokeStyle = headColor;
  ctx.fillStyle = headColor;
  ctx.lineWidth = 3;

  if (radioValue === "stroke") {
    return ctx.stroke();
  }
  if (radioValue === "fill") {
    return ctx.fill();
  }
};

let clickForm = (e) => {
  if (mode == "square") {
    ctx.beginPath();
    ctx.rect(x - rangeValue / 2, y - rangeValue / 2, rangeValue, rangeValue);
    chooseChamp();
  }
  if (mode == "circle") {
    ctx.beginPath();
    ctx.arc(x, y, rangeValue / 2, 0, 2 * Math.PI);
    chooseChamp();
  }
  if (mode == "tri") {
    let demiL = rangeValue / 2;
    let hauteur = Math.round((Math.sqrt(3) / 2) * rangeValue);
    x = x - demiL;
    y = y + hauteur / 2;
    console.log(rangeValue, hauteur);
    console.log(rangeValue);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + rangeValue, y);
    ctx.lineTo(x + demiL, y - hauteur);
    ctx.lineTo(x, y);
    ctx.closePath();
    chooseChamp();
  }
  if (mode == "text") {
    var textWidth = textForm.offsetWidth;
    console.log(textWidth);
    textForm.classList.remove("none");
    textForm.style.top = e.clientY + "px";
    textForm.style.left = e.clientX + "px";
    xTextPos = x;
    yTextPos = y;
  }
};

let mouseTracking = (e) => {
  var xMousePos = 0;
  var yMousePos = 0;
  xMousePos = e.clientX;
  yMousePos = e.clientY;
  //console.log(xMousePos, yMousePos);

  let widhtBorder = (window.innerWidth - canva.clientWidth) / 2;
  let heightBorder = (window.innerHeight - canva.clientHeight) / 2;

  x = xMousePos - widhtBorder;
  y = yMousePos - heightBorder;
  if (y < 0) {
    y = 0;
  }
  if (x < 0) {
    x = 0;
  }
  xPos.textContent = "x = " + x + " px";
  yPos.textContent = "y = " + y + " px";

  /*if (textIsActive) {
    //textForm.classList.remove('none');
    textForm.style.top = `${yMousePos} px`;
    textForm.style.left = `${xMousePos} px`;
  }*/

  canva.addEventListener("click", clickForm);
};

canva.addEventListener("mousemove", mouseTracking);

let square = () => {
  console.log("ceci est un carre");
  mode = "square";
};
let circle = () => {
  console.log("ceci est un rond");
  mode = "circle";
};
let tri = () => {
  console.log("ceci est un triangle");
  mode = "tri";
};
let textContent = () => {
  console.log("ceci est un test");
  mode = "text";
  //textIsActive = true;
  //textForm.classList.remove("none");
};
let clean = () => {
  ctx.clearRect(0, 0, canva.width, canva.height);
};

carre.addEventListener("click", square);
rond.addEventListener("click", circle);
triangle.addEventListener("click", tri);
cleanBtn.addEventListener("click", clean);
textBtn.addEventListener("click", textContent);
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(textInput.value);
  ctx.fillText(textInput.value, xTextPos, yTextPos);
  ctx.font = `${rangeValue}px serif`;
  chooseChamp();
  textForm.classList.add("none");
  textForm.textContent = "";
  mode = "";
});
textCancel.addEventListener("click", () => {
  textForm.classList.add("none");
  textForm.textContent = "";
  mode = "";
});
