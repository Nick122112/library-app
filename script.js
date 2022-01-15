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

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
// theHobbit.info();
// console.log(theHobbit.info());

function addBookToLibrary() {
  let newBook = new Book();
  newBook.title = document.getElementById("titleInput").value;
  newBook.author = document.getElementById("authorInput").value;
  newBook.pages = document.getElementById("pagesInput").value;
  if (document.getElementById("readInput").checked) {
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
    const readStatus = document.createElement("p");
    const removeBtn = document.createElement("button");
    removeBtn.addEventListener("click", removeBook);
    titleDisplay.textContent = myLibrary[i].title;
    authorDisplay.textContent = myLibrary[i].author;
    pagesDisplay.textContent = myLibrary[i].pages;
    readStatus.textContent = myLibrary[i].read;
    removeBtn.textContent = "Remove Book";
    document.querySelector("#card-container").appendChild(card);
    card.appendChild(titleDisplay);
    card.appendChild(authorDisplay);
    card.appendChild(pagesDisplay);
    card.appendChild(readStatus);
    card.appendChild(removeBtn);
  }
  myLibrary.forEach((book, index) => {
    book.id = index;
  });
}

function clearCards() {
  document.querySelector("#card-container").textContent = "";
}

function removeBook() {
  const removeIndex = myLibrary.findIndex((book) => book.id === this.id);
  myLibrary.splice(removeIndex, 1);
  console.log(myLibrary);
  displayBooks();
}
