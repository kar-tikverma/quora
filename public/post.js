const button = document.querySelector("button");
const username = document.querySelector("input");
const content = document.querySelector(".content");

const originalContent = content.value.trim();

button.disabled = true;

function checkInputs() {
    const val = content.value.trim();
    button.disabled = username.value.trim() === "" || val === "" || val === originalContent;
}

username.addEventListener("input", checkInputs);
content.addEventListener("input", checkInputs);