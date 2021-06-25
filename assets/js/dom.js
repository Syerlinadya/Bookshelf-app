const bookId = "idbook";
const bookIncompleted = "incompleteBookshelf";
const bookCompleted = "completeBookshelf";

const btniya = document.getElementById("iya");
const btntidak = document.getElementById("tidak");
const modalDelete = document.getElementById("deletemodal");
const modalEdit = document.getElementById("editmodal");
const btnBatalEdit = document.getElementById("cancel");

function addBook(){
    const tittleBook = document.getElementById("tittle").value;
    const authorBook = document.getElementById("author").value;
    const yearBook = document.getElementById("year").value;
    const isCompleted = document.getElementById("isComplete").checked;

    const makeBook = makebookshelf(tittleBook, authorBook, yearBook, isCompleted);

    const listIncompleted = document.getElementById(bookIncompleted);
    const listCompleted = document.getElementById(bookCompleted);

    if(isCompleted === true){
        listCompleted.append(makeBook);
    }else{
        listIncompleted.append(makeBook);
    }

    const bookData = makebookData(tittleBook, authorBook, yearBook, isCompleted);
    makeBook[bookId] = bookData.id;
    books.push(bookData);

    updateToStorage();
}

function makebookshelf(tittle, author, year, isCompleted){
    const tittleBook = document.createElement("p");
    tittleBook.innerText = tittle;
    tittleBook.classList.add("bookTittle");
    
    const authorBook = document.createElement("p");
    authorBook.innerText = author;
    authorBook.classList.add("authorBook");
    
    const yearBook = document.createElement("p");
	yearBook.innerText = year;
	yearBook.classList.add("yearBook");

    const wrapper = document.createElement("div");
    const container = document.createElement("div");
    container.classList.add("book");
    container.append(tittleBook, authorBook, yearBook);

    if (isCompleted === true){
        wrapper.classList.add("completedList");
        container.append(btnComplete(), btnEdit(),removeBtn(), wrapper);
    }else{
        wrapper.classList.add("incompletedList");
        container.append(btnInComplete(), btnEdit(), removeBtn(), wrapper);
    }

    return container;
}

function createBtn(title, classType, eventListener) {
	const button = document.createElement("button");
	button.innerText = title;
	button.classList.add(classType);
	button.addEventListener("click", function (event) {
		eventListener(event);
	});
	return button;
}

function btnInComplete(){
    return createBtn("Selesai","btn-done", function (event) {
		addBookCompleted(event.target.parentElement);
	});
}

function btnComplete(){
	return createBtn("Belum Selesai", "btn-done",function (event) {
		BookInCompleted(event.target.parentElement);
	});
}


function removeBtn(){
    return createBtn("delete","btn-delete", function(event){
        modalDelete.style.display = "block";
		btniya.onclick = () => {
			removeBookFromCompleted(event.target.parentElement);
			modalDelete.style.display = "none";
		};
    });
}

function addBookCompleted(bookElement){
    const listCompleted = document.getElementById(bookCompleted);
    const tittleBook = bookElement.querySelector(".bookTittle").innerText;
    const authorBook = bookElement.querySelector(".authorBook").innerText;
    const yearBook = bookElement.querySelector(".yearBook").innerText;

    const newBook = makebookshelf(tittleBook, authorBook, yearBook, true);
    const bookData = findBook(bookElement[bookId]);
    bookData.isCompleted = true;
    newBook[bookId] = bookData.id;

    listCompleted.append(newBook);
    bookElement.remove();
    updateToStorage();
}

function BookInCompleted(bookElement){
    const listInCompleted = document.getElementById(bookIncompleted);
    const tittleBook = bookElement.querySelector(".bookTittle").innerText;
    const authorBook = bookElement.querySelector(".authorBook").innerText;
    const yearBook = bookElement.querySelector(".yearBook").innerText;

    const newBook = makebookshelf(tittleBook, authorBook, yearBook, false);
    const bookData = findBook(bookElement[bookId]);
    bookData.isCompleted = false;
    newBook[bookId] = bookData.id;

    listInCompleted.append(newBook);
    bookElement.remove();
    updateToStorage();
}

function removeBookFromCompleted(bookElement){
    const bookPosition = findBookIndex(bookElement[bookId]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateToStorage();
}

function editBook(bookElement){
    const tittleBook = document.getElementById("titleEdit").value;
    const authorBook = document.getElementById("authorEdit").value;
    const yearBook = document.getElementById("yearEdit").value;
    const isCompleted = document.getElementById("isCompletedEdit").checked;

    const makeBook = makebookshelf(tittleBook, authorBook, yearBook, isCompleted);

    const listIncompleted = document.getElementById(bookIncompleted);
    const listCompleted = document.getElementById(bookCompleted);

    const bookData = findBook(bookElement[bookId]);
    bookData.title = tittleBook;
    bookData.author = authorBook;
    bookData.year = yearBook;
    bookData.isCompleted = isCompleted;

    if(isCompleted === true){
        bookElement.remove();
        listCompleted.append(makeBook);
    }else{
        bookElement.remove();
        listIncompleted.append(makeBook);
    }
     updateToStorage();
}

function btnEdit() {
	return createBtn("Edit", "btn-edit", function (event) {
		const editForm = document.getElementById("formEdit");
		const targetElement = event.target.parentElement.children;
		modalEdit.style.display = "block";
		document.getElementById("titleEdit").value = targetElement[0].innerText;
		document.getElementById("authorEdit").value = targetElement[1].innerText;
		document.getElementById("yearEdit").value = targetElement[2].innerText;
		if (
			event.target.parentElement.lastChild.className == "border-bot-selesai"
		) {
			document.getElementById("isCompletedEdit").checked = true;
		} else {
			document.getElementById("isCompletedEdit").checked = false;
		}
		editForm.addEventListener("submit", () => {
			editBook(event.target.parentElement);
			modalEdit.style.display = "none";
		});
	});
}

btntidak.onclick = () => {
    modalDelete.style.display = "none";
}

btnBatalEdit.onclick = () => {
    modalEdit.style.display = "none";
}

window.onclick = (e) => {
    if(e.target == modalDelete || e.target == modalEdit){
        modalDelete.style.display = "none";
        modalEdit.style.display = "none";
    }
}