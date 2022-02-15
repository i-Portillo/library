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

        container.appendChild(newBook);
    });
}

function createDummyBooks(n) {
    for (let index = 0; index < n; index++) {
        myLibrary.push( new Book("The Hobbit", "J.R.R. Tolkien", 295, false) );
    }
}

createDummyBooks(12);

const container = document.querySelector(".container");

render();

