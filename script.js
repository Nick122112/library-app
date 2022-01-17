"use strict";

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary() {
  let newBook = new Book();
  newBook.title = document.getElementById("title-input").value;
  newBook.author = document.getElementById("author-input").value;
  newBook.pages = document.getElementById("pages-input").value;
  newBook.id = uuidv4();
  if (document.getElementById("read-input").checked) {
    newBook.read = "Read";
  } else {
    newBook.read = "Not read";
  }
  myLibrary.push(newBook);
  console.log(myLibrary);
  displayBooks();
}

function displayBooks() {
  clearCards();
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === "") {
      myLibrary.shift();
    }
    const card = document.createElement("div");
    card.setAttribute("style", "width: 20rem height: 20rem");
    const titleDisplay = document.createElement("h2");
    const authorDisplay = document.createElement("p");
    const pagesDisplay = document.createElement("p");
    const readStatusBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", myLibrary[i].id);
    removeBtn.addEventListener("click", removeBook);
    titleDisplay.textContent = myLibrary[i].title;
    authorDisplay.textContent = myLibrary[i].author;
    pagesDisplay.textContent = myLibrary[i].pages;
    readStatusBtn.textContent = myLibrary[i].read;
    removeBtn.textContent = "Remove Book";
    document.querySelector("#card-container").appendChild(card);
    card.appendChild(titleDisplay);
    card.appendChild(authorDisplay);
    card.appendChild(pagesDisplay);
    card.appendChild(readStatusBtn);
    card.appendChild(removeBtn);
  }
  console.log(myLibrary);
}

function clearCards() {
  document.querySelector("#card-container").textContent = "";
}

function removeBook() {
  console.log(this.id);
  const newArray = myLibrary.filter((book) => book.id !== this.id);
  myLibrary = newArray;
  displayBooks();
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const addBookFormBtn = document.querySelector(".add-book-form-btn");
addBookFormBtn.addEventListener("click", () => {
  addBookToLibrary();
  closeModal();
});

// modal
const modalDisplay = document.querySelector(".hide-show-modal");
const addBookBtn = document.querySelector("#add-book-btn");
const closeModalBtn = document.querySelector(".book-form-close-btn");
console.log(closeModalBtn);

addBookBtn.addEventListener("click", openModal);
function openModal() {
  modalDisplay.style.display = "block";
}

closeModalBtn.addEventListener("click", closeModal);
function closeModal() {
  modalDisplay.style.display = "none";
}

// readStatusBtn.addEventListener("click", toggle);
// function toggle() {
//   if (newBook.read === "Read") {
//     newBook.read === "Not read";
//     readStatusBtn.textContent === "Not read";
//   } else if (newBook.read === "Not read") {
//     newBook.read === "Read";
//     readStatusBtn.textContent === "Read";
//   }
// }
