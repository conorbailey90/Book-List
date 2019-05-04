// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Contstructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Append book details to new tr element
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x<a></td>`;

  list.appendChild(row);
};

// Show alert

UI.prototype.showAlert = function(message, className) {
  // Create a div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent element
  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete book

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function() {
  title.value = "";
  author.value = "";
  isbn.value = "";
};

// Event listeners

//Event listener for add book

document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please complete all fields.", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success

    ui.showAlert("Book Added", "success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete

document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  ui.showAlert("Book deleted!", "success");
  e.preventDefault();
});
