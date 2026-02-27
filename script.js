function getBooks(){
return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books){
localStorage.setItem("books", JSON.stringify(books));
updateStats();
}

function addBook(){

let title = document.getElementById("title").value;
let author = document.getElementById("author").value;
let category = document.getElementById("category").value;

if(!title || !author){
alert("Fill all fields");
return;
}

let books = getBooks();

books.push({
title,
author,
category,
issued:false
});

saveBooks(books);

document.getElementById("msg").innerText="Book Added Successfully";

}

function showBooks(){

let books = getBooks();
let container = document.getElementById("bookList");

if(!container) return;

container.innerHTML="";

books.forEach((b,i)=>{

container.innerHTML += `
<div class="bookCard">
<h3>${b.title}</h3>
<p>${b.author}</p>
<span>${b.category || ""}</span>

<div class="btnGroup">

<button onclick="toggleIssue(${i})">
${b.issued ? "Return" : "Issue"}
</button>

<button class="delete" onclick="deleteBook(${i})">
Delete
</button>

</div>
</div>
`;
});

updateStats();
}

function deleteBook(index){
let books = getBooks();
books.splice(index,1);
saveBooks(books);
showBooks();
}

function toggleIssue(index){

let books = getBooks();
books[index].issued = !books[index].issued;

saveBooks(books);
showBooks();
}

function updateStats(){

let books = getBooks();

let total = books.length;
let issued = books.filter(b=>b.issued).length;

let t = document.getElementById("totalBooks");
let i = document.getElementById("issuedBooks");

if(t) t.innerText = total;
if(i) i.innerText = issued;

}

function searchBook(){

let input = document.getElementById("search").value.toLowerCase();
let cards = document.querySelectorAll(".bookCard");

cards.forEach(card=>{

let text = card.innerText.toLowerCase();

card.style.display = text.includes(input) ? "block" : "none";

});

}

showBooks();
