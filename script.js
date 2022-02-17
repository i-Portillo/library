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

Book.prototype.setRead = function (read) {
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function buildBookCard(book) {
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
        removeButton.addEventListener('click', (e) => {
            let bookCard = e.target.parentNode;
            let removedTitle = bookCard.childNodes[0].textContent;
            myLibrary = myLibrary.filter(function (obj) {
                return obj.title !== removedTitle;
            });
            render();
        });
        newBook.appendChild(removeButton);

        let markReadButton = document.createElement('button');
        markReadButton.classList.add('read-button');
        markReadButton.textContent = "Mark as read";
        markReadButton.addEventListener('click', (e) => {
            let bookCard = e.target.parentNode;
            console.log(bookCard);
            let bookIndex = myLibrary.findIndex(book => book.title === bookCard.childNodes[0].textContent)
            console.log(bookIndex);
            if (myLibrary[bookIndex].read === false) {
                myLibrary[bookIndex].read = true;
                markReadButton.textContent = "Mark as pendent";
            } else {
                myLibrary[bookIndex].read = false;
                markReadButton.textContent = "Mark as read";
            }
            render();
        });
        newBook.appendChild(markReadButton);

        container.appendChild(newBook);
}

function render() {
    container.innerHTML = '';
    myLibrary.forEach(book => {
        buildBookCard(book);
    });
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

const container = document.querySelector(".container");

myLibrary.push( new Book("The Hobbit", "J.R.R. Tolkien", 295, false) );

render();

