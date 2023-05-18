const mq = window.matchMedia("(max-width: 1200px)");
const password = document.querySelector(".password");
const copy = document.querySelector("img");
const lengthNumber = document.querySelector(".length");
const sliderBox = document.querySelector("slider");
const slider = document.getElementById("myRange");
const lengthStr = document.querySelector(".length__str");
const barOne = document.querySelector(".bar1");
const barTwo = document.querySelector(".bar2");
const barThree = document.querySelector(".bar3");
const barFour = document.querySelector(".bar4");
const button = document.querySelector(".button");
const upperCheck = document.getElementById("uppercase");
const lowerCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const charactersUpper = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0`;
const charactersLower = `abcdefghijklmnopqrstuvwxyz`;
const charactersNumbers = `123456789`;
const charactersSymbols = `@%+\\/!~#$%^&*(){}?><§£`;

//characters
let characters =
  charactersUpper + charactersLower + charactersNumbers + charactersSymbols;

//🟢dynamic number of length by slider
const dynamicLength = function () {
  lengthNumber.innerHTML = this.value;
};
slider.addEventListener("input", dynamicLength);

//checkboxes helping functions
const checkFalse = function (char) {
  characters = characters.replace(char, "");
  //getting value(text) of length span
  let lngNmbTxt = lengthNumber.innerHTML;
  //adding length as a param to generate password function

  password.innerHTML = generatePassword(`${lngNmbTxt}`);

  // console.log(characters);
  password.style.color = "#E6E5EA";
};

const checkTrue = function (char) {
  characters = characters.replace(char, "");
  characters = characters.concat(char);
  //getting value(text) of length span
  let lngNmbTxt = lengthNumber.innerHTML;
  //adding length as a param to generate password function
  password.innerHTML = generatePassword(`${lngNmbTxt}`);
  //copy to clipboard
  // console.log(characters);
  password.style.color = "#E6E5EA";
};

// copy to cliboard

const copyPass = async function () {
  try {
    await navigator.clipboard.writeText(password.textContent);
    // alert("Copied to clipboard");
  } catch (err) {
    console.log("Failed to copy:", err);
  }
};

copy.addEventListener("click", function () {
  Swal.fire({
    title: "Copy to clipboard!",
    background: "rgba(24, 23, 31, 1)",
    color: "#E6E5EA",
    confirmButtonText: "OK!",
    confirmButtonColor: "#A4FFAF",
  });
});

//🟢checkboxes functions
const checkBoxUpper = function () {
  if (upperCheck.checked === false) {
    checkFalse(charactersUpper);
  }
  if (upperCheck.checked === true) {
    checkTrue(charactersUpper);
  }
};

const checkBoxLower = function () {
  if (lowerCheck.checked === false) {
    checkFalse(charactersLower);
  }
  if (lowerCheck.checked === true) {
    checkTrue(charactersLower);
  }
};

const checkBoxNumbers = function () {
  if (numbersCheck.checked === false) {
    checkFalse(charactersNumbers);
  }
  if (numbersCheck.checked === true) {
    checkTrue(charactersNumbers);
  }
};

const checkBoxSymbols = function () {
  if (symbolsCheck.checked === false) {
    checkFalse(charactersSymbols);
  }
  if (symbolsCheck.checked === true) {
    checkTrue(charactersSymbols);
  }
};

//bar colors function
const barColors = function (c1, c2, c3, c4) {
  barOne.style.backgroundColor = c1;
  barTwo.style.backgroundColor = c2;
  barThree.style.backgroundColor = c3;
  barFour.style.backgroundColor = c4;
};

//🟢generating passwords
const generatePassword = function (length) {
  let result = "";
  const charLength = characters.length;
  for (let c = 0; c < length; c++) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
};

//🟢button function
button.addEventListener("click", function () {
  checkBoxUpper();
  checkBoxLower();
  checkBoxNumbers();
  checkBoxSymbols();

  //when all checkboxes are empty
  if (
    upperCheck.checked === false &&
    lowerCheck.checked === false &&
    numbersCheck.checked === false &&
    symbolsCheck.checked === false
  ) {
    password.innerHTML = "Choose option";
    password.style.color = "#807C92";
  }

  //strength bars
  if (lengthNumber.innerHTML <= 5) {
    lengthStr.textContent = "Too weak!";
    barColors(
      "rgba(248, 205, 101, 1)",
      "transparent",
      "transparent",
      "transparent"
    );
  }
  if (lengthNumber.innerHTML >= 6 && lengthNumber.innerHTML <= 10) {
    lengthStr.textContent = "Weak";
    barColors(
      "rgba(248, 205, 101, 1)",
      "rgba(248, 205, 101, 1)",
      "transparent",
      "transparent"
    );
  }
  if (lengthNumber.innerHTML >= 11 && lengthNumber.innerHTML <= 15) {
    lengthStr.textContent = "Medium";
    barColors(
      "rgba(248, 205, 101, 1)",
      "rgba(248, 205, 101, 1)",
      "rgba(248, 205, 101, 1)",
      "transparent"
    );
  }
  if (lengthNumber.innerHTML >= 16 && lengthNumber.innerHTML <= 20) {
    lengthStr.textContent = "Strong";
    barColors(
      "rgba(248, 205, 101, 1)",
      "rgba(248, 205, 101, 1)",
      "rgba(248, 205, 101, 1)",
      "rgba(248, 205, 101, 1)"
    );
  }

  if (lengthStr.innerHTML.length >= 8) {
    lengthStr.style.left = "290px";
  }
  if (lengthStr.innerHTML.length <= 8) {
    lengthStr.style.left = "315px";
  }
  if (lengthStr.innerHTML.length === 4) {
    lengthStr.style.left = "335px";
  }

  if (mq.matches && lengthStr.innerHTML.length >= 8) {
    lengthStr.style.left = "130px";
  }
  if (lengthStr.innerHTML.length <= 8) {
    lengthStr.style.left = "155px";
  }
  if (mq.matches && lengthStr.innerHTML.length === 4) {
    lengthStr.style.left = "170px";
  }
});
