// const book = {
//     init: function(title, author, pages, read) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.read = read;
//         return this;
//     },
//     info: function() {
//         return `${this.title} by ${this.author}, ${this.pages} pages, ` +
//         (this.read ? "already read." : "not read yet.");
//     },
// }

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    var info = `${this.title} by ${this.author}, ${this.pages}` + 
        ` pages, `;
    info += this.read ? "already read." : "not read yet.";
    return info;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function render() {
    container.innerHTML = '';
    myLibrary.forEach(book => {
        let newBook = document.createElement('div');
        newBook.classList.add('book-card');
        
        let title = document.createElement('p');
        title.classList.add('title');
        title.textContent = book.title;
        newBook.appendChild(title);

        let author = document.createElement('p');
        author.classList.add('author');
        author.textContent = "by " + book.author;
        newBook.appendChild(author);

        let pages = document.createElement('p');
        pages.classList.add('pages');
        pages.textContent = "Pages: " + book.pages;
        newBook.appendChild(pages);

        let read = document.createElement('p');
        read.classList.add('read');
        read.textContent = book.read ? "Read." : "Not read yet.";
        newBook.appendChild(read);

        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = "Remove";
        removeButton.addEventListener('click', (event) => {
            let bookCard = event.target.parentNode;
            let removedTitle = bookCard.childNodes[0].textContent;
            myLibrary = myLibrary.filter(function (obj) {
                return obj.title !== removedTitle;
            });
            render();
        });
        newBook.appendChild(removeButton);

        container.appendChild(newBook);
    });
}

function createDummyBooks(n) {
    for (let index = 0; index < n; index++) {
        myLibrary.push( new Book("The Hobbit" + index, "J.R.R. Tolkien", 295, false) );
    }
}

const formContainer = document.querySelector("#book-form");
const newBookButton = document.querySelector(".header button");
const addBookButton = document.querySelector("#book-form button");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");

newBookButton.addEventListener('click', () => {
    formContainer.style.display = "block";
});

addBookButton.addEventListener('click', () => {
    addBookToLibrary(new Book(titleInput.value,
                              authorInput.value,
                              pagesInput.value,
                              readInput.checked));
    render();
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.value = "";
    formContainer.style.display = "none";
});


createDummyBooks(12);

const container = document.querySelector(".container");

render();

