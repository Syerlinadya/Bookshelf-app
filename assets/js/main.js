const submitForm = document.getElementById("inputBook");
const searchForm = document.getElementById("searchBook");

document.addEventListener("DOMContentLoaded", () => {
    
    submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addBook();
    });
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        searchInCompletedBook();
        searchCompletedBook();
    });
    if (isStorageExist()){
        loadBookFromStorage();
    };
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
    document.addEventListener("ondataloaded", () => {   
    refreshBookFromBookshelf();
});

function searchInCompletedBook(){
    const filter = document.getElementById("searchBookTittle").value.toUpperCase();
    const listBookInCompleted = document.getElementById("incompleteBookshelf");
    const list = listBookInCompleted.getElementsByClassName("book");

    for(i = 0; i < list.length; i++){
        a = list[i].getElementsByClassName("bookTittle")[0];
        tittleValue = a.textContent || a.innerText;
        if(tittleValue.toUpperCase().indexOf(filter) > -1){
            list[i].style.display = "";
        }else{
            list[i].style.display = "none";
        }
    }
}

function searchCompletedBook(){
    const filter = document.getElementById("searchBookTittle").value.toUpperCase();
    const listBookCompleted = document.getElementById("completeBookshelf");
    const list = listBookInCompleted.getElementsByClassName("book");

    for(i = 0; i < list.length; i++){
        a = list[i].getElementsByClassName("bookTittle")[0];
        tittleValue = a.textContent || a.innerText;
        if(tittleValue.toUpperCase().indexOf(filter) > -1){
            list[i].style.display = "";
        }else{
            list[i].style.display = "none";
        }
    }
}
