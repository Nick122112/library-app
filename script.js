"use strict";

// empty array to store books in
let myLibrary = [];

// object constructor that will be used to create all of the books
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

// function that can be used on all instances of Book because it was declared on Book's prototype
Book.prototype.toggle = function () {
  if (this.read === "Read") {
    this.read = "Not read";
  } else if (this.read === "Not read") {
    this.read = "Read";
  }
};

// function that creates a new Book (new instance of Book), gives the book a unique ID, pushes the book to the myLibrary array, and runs the displayBooks function
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
  displayBooks();
}

// function that runs the clearCards function (makes the card container empty) and loops through the myLibrary array, giving the obect properties DOM elements
function displayBooks() {
  clearCards();
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === "") {
      myLibrary.shift();
    }
    const card = document.createElement("div");
    card.setAttribute(
      "style",
      "width: 30rem; background-color: #fff; display: flex; flex-direction: column; align-items: center; border-radius: 0.5rem;"
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
    readStatusBtn.setAttribute("id", myLibrary[i].id); // gives the readStatusBtn the same ID as the book that it is on in the DOM. This associtaes the readStatusBtn with the book.
    readStatusBtn.setAttribute(
      "style",
      "background-color: #06beb6; color: #fff; border: none; font-size: 1.8rem; width: 10rem; margin-top: 1rem; padding-top: 1rem; padding-bottom: 1rem; margin-bottom: 1rem; border-radius: 0.5rem;"
    );
    readStatusBtn.addEventListener("click", () => {
      const selectedBook = myLibrary.find(
        (book) => book.id === readStatusBtn.id
      ); // looks through the myLibrary array to find a book that shares the same ID as the readStatusBtn and gives this book a variable of selectedBook
      selectedBook.toggle(); // calls the toggle() function from the Book constructor's prototype to change the readStatus
      displayBooks(); // displays the books again so that the DOM can be updated with the new read status
    });
    readStatusBtn.addEventListener("mouseover", () => {
      readStatusBtn.classList.add("book-card-btn-hover");
    });
    readStatusBtn.addEventListener("mouseout", () => {
      readStatusBtn.classList.remove("book-card-btn-hover");
    });
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", myLibrary[i].id); // gives the remove button the same ID as the current book to associate them
    removeBtn.setAttribute(
      "style",
      "background-color: #06beb6; color: #fff; border: none; font-size: 1.8rem; width: 10rem; margin-top: 1rem; margin-bottom: 1rem; padding-top: 1rem; padding-bottom: 1rem; border-radius: 0.5rem;"
    );
    removeBtn.addEventListener("mouseover", () => {
      removeBtn.classList.add("book-card-btn-hover");
    });
    removeBtn.addEventListener("mouseout", () => {
      removeBtn.classList.remove("book-card-btn-hover");
    });
    removeBtn.addEventListener("click", removeBook); // removeBook() function is called when the removeBtn is clicked
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
  document.querySelector("#card-container").textContent = ""; // clears all of the cards from the DOM
}

function removeBook() {
  const newArray = myLibrary.filter((book) => book.id !== this.id); // Creates a new array of books that don't have the same ID as the removeBookBtn
  myLibrary = newArray; // sets myLibrary array equal to the newArray
  displayBooks(); // displays the books again to update the DOM
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
} // sets a unique ID for each book

const addBookFormBtn = document.querySelector(".add-book-form-btn");
addBookFormBtn.addEventListener("click", () => {
  addBookToLibrary();
  closeModal();
  clearForm();
});

// modal
const modal = document.querySelector(".modal");
const modalDisplay = document.querySelector(".hide-show-modal");
const addBookBtn = document.querySelector("#add-book-btn");
const closeModalBtn = document.querySelector(".book-form-close-btn");

// function to close modal if outside click
addBookBtn.addEventListener("click", openModal);
function openModal() {
  modalDisplay.style.display = "block";
}

closeModalBtn.addEventListener("click", closeModal);
function closeModal() {
  modalDisplay.style.display = "none";
}

// listens for click outside the modal content
window.addEventListener("click", outsideClick);
function outsideClick(e) {
  if (e.target === modal) {
    modalDisplay.style.display = "none";
  }
}

function clearForm() {
  document.querySelector("form").reset();
}
