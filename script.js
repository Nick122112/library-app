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

Book.prototype.toggle = function () {
  if (this.read === "Read") {
    this.read = "Not read";
  } else if (this.read === "Not read") {
    this.read = "Read";
  }
};

console.log(Book.prototype);

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
    card.setAttribute(
      "style",
      "width: 30rem; height: 30rem; background-color: #fff; display: flex; flex-direction: column; align-items: center; border-radius: 0.5rem;"
    );
    const titleDisplay = document.createElement("h2");
    titleDisplay.setAttribute(
      "style",
      "font-size: 2.8rem; width: 100%; text-align: center; background: #48b1bf; color: #fff; padding: 1rem 0; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem"
    );
    const authorDisplay = document.createElement("p");
    authorDisplay.setAttribute(
      "style",
      "font-size: 2.4rem; margin-top: 1rem; margin-bottom: 1rem;"
    );
    const pagesDisplay = document.createElement("p");
    pagesDisplay.setAttribute(
      "style",
      "font-size: 2.4rem; margin-top: 1rem; margin-bottom: 1rem;"
    );
    const readStatusBtn = document.createElement("button");
    readStatusBtn.setAttribute("id", myLibrary[i].id);
    readStatusBtn.setAttribute(
      "style",
      "background-color: #48b1bf; color: #fff; border: none; font-size: 1.8rem; width: 10rem; margin-top: 1rem; padding-top: 1rem; padding-bottom: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;"
    );
    readStatusBtn.addEventListener("click", () => {
      console.log(readStatusBtn.id);
      const selectedBook = myLibrary.find(
        (book) => book.id === readStatusBtn.id
      );
      selectedBook.toggle();
      displayBooks();
    });
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", myLibrary[i].id);
    removeBtn.setAttribute(
      "style",
      "background-color: #48b1bf; color: #fff; border: none; font-size: 1.8rem; width: 10rem; margin-top: 1rem; margin-bottom: 1rem; padding-top: 1rem; padding-bottom: 1rem; border-radius: 0.5rem;"
    );
    removeBtn.addEventListener("click", removeBook);
    titleDisplay.textContent = myLibrary[i].title;
    authorDisplay.textContent = myLibrary[i].author;
    pagesDisplay.textContent = `${myLibrary[i].pages} pages`;
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
