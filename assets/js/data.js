const keyStorage = "BOOK_SHELF_LIST";

let books = [];

function isStorageExist() {
	if (typeof Storage === undefined) {
		alert("Browser kamu tidak mendukung local storage");
		return false;
	}
	return true;
}

function saveBook() {
	const parsed = JSON.stringify(books);
	localStorage.setItem(keyStorage, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function loadBookFromStorage() {
	const setData = localStorage.getItem(keyStorage);
	let data = JSON.parse(setData);
	if (data !== null) books = data;
	document.dispatchEvent(new Event("ondataloaded"));
}

function updateToStorage() {
	if (isStorageExist()) {
		saveBook();
	}
}

function makebookData(title, author, year, isCompleted) {
	return {
		id: +new Date(),
		title,
		author,
		year,
		isCompleted,
	};
}

function findBook(bookId) {
	for (book of books) {
		if (book.id === bookId) return book;
	}
	return null;
}

function findBookIndex(bookId) {
	let index = 0;
	for (book of books) {
		if (book.id === bookId) return index;

		index++;
	}

	return -1;
}

function refreshBookFromBookshelf() {
	const listIncompleted = document.getElementById(bookIncompleted);
	let listCompleted = document.getElementById(bookCompleted);

	for (book of books) {
		const newBook = makebookshelf(
			book.title,
			book.author,
			book.year,
			book.isCompleted
		);
		newBook[bookId] = book.id;

		if (book.isCompleted) {
			listCompleted.append(newBook);
		} else {
			listIncompleted.append(newBook);
		}
	}
}