let list = document.getElementById("note-list");

let completeNotesList = document.getElementById("complete-notes-list");

let unCompleteNotesList = document.getElementById("uncomplete-notes-list");

let addNoteBtn = document.getElementById("button-addon2");

let formInput = document.getElementById("input");

let showAllNotesBtn = document.getElementById("all-notes-btn");

let showcompleteNoteBtn = document.getElementById("complete-notes-btn");

let showunCompleteNoteBtn = document.getElementById("uncomplete-notes-btn");

let values = [];

//что попробовать для оптимизции: вынести вне addNote процесс сборки элемента списка, в addNote только вставлять содержимое p ; сделать это для того, чтобы при рендере завершенных/незавершенных задач не нужно было заново вставлять написанные куски кода

// checkbox problem & optimization

const addNote = (e) => {
  let inputValue = document.getElementById("input").value;
  let task = {
    task: inputValue,
    isDone: false,
  };
  values.push(task);
  formInput.value = "";
  let el = values[values.length - 1];
  let el_text = el["task"];
  let li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );

  //create html elements
  let div = document.createElement("div");
  let checkbox = document.createElement("input");
  let p = document.createElement("p");
  let deleteBtnLi = document.createElement("button");

  //set types&classes to the elements
  checkbox.classList.add("form-check-input", "me-1");
  checkbox.type = "checkbox";
  p.style.display = "inline";
  deleteBtnLi.type = "button";
  deleteBtnLi.classList.add("btn", "btn-danger");

  p.textContent = el_text;
  deleteBtnLi.textContent = "Delete";

  //inbuild elements to DOM
  div.appendChild(checkbox);
  div.appendChild(p);
  li.appendChild(div);
  li.appendChild(deleteBtnLi);
  list.appendChild(li);

  //deleteBtn
  const deleteNote = (e) => {
    list.removeChild(li);
    values.splice(values.indexOf(el), 1);
  };

  deleteBtnLi.onclick = deleteNote;

  //complete task checkbox
  let complete = (e) => {
    el.isDone = !el.isDone;
    if (el.isDone) {
      p.style.textDecoration = "line-through";
      p.style.opacity = "0.5";
    } else {
      p.style.opacity = "1.0";
      p.style.textDecoration = "none";
    }

    console.log(el);
  };
  checkbox.onclick = complete;
};

const showAll = (e) => {
  list.style.display = "block";
  completeNotesList.style.display = "none";
  unCompleteNotesList.style.display = "none";
};

// варианты решения: 1. перед вызовов showComplete затирать все, что есть в списке

const showComplete = (e) => {
  list.style.display = "none";
  completeNotesList.style.display = "block";
  unCompleteNotesList.style.display = "none";

  if (completeNotesList.hasChildNodes) {
    while (completeNotesList.firstChild) {
      completeNotesList.removeChild(completeNotesList.firstChild);
    }
  } else {
    console.log("completeNotesList has no childNodes");
  }

  values.forEach((element) => {
    if (element.isDone) {
      let li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "align-items-center",
        "justify-content-between"
      );

      li.innerText = element["task"];
      completeNotesList.appendChild(li);
    }
  });
};

const showunComplete = () => {
  list.style.display = "none";
  completeNotesList.style.display = "none";
  unCompleteNotesList.style.display = "block";

  if (unCompleteNotesList.hasChildNodes) {
    while (unCompleteNotesList.firstChild) {
      unCompleteNotesList.removeChild(unCompleteNotesList.firstChild);
    }
  } else {
    console.log("unCompleteNotesList has no childNodes");
  }

  values.forEach((element) => {
    if (element.isDone == false) {
      let li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "align-items-center",
        "justify-content-between"
      );

      li.innerText = element["task"];
      unCompleteNotesList.appendChild(li);
    }
  });
};

addNoteBtn.addEventListener("click", addNote);
formInput.addEventListener("keypress", (e) => {
  e.key === "Enter" ? addNote() : null;
});

showAllNotesBtn.addEventListener("click", showAll);
showcompleteNoteBtn.addEventListener("click", showComplete);
showunCompleteNoteBtn.addEventListener("click", showunComplete);
