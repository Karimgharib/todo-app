let icon = document.querySelector(".landing .word .icon");
let light = document.querySelector(".landing .word .icon .light");
let dark = document.querySelector(".landing .word .icon .dark");
let list = document.querySelector(".list .container .doing");
let input = document.querySelector("input");
let all = document.querySelector(".footer .all");
let complete = document.querySelector(".footer .complete");
let active = document.querySelector(".footer .active");
let clear = document.querySelector(".footer .clear");
let left = document.querySelector(".footer .left span");

let darkk = "disable";

if (localStorage.getItem("theme")) {
  darkk = localStorage.getItem("theme");
}

let arrayTask = [];

if (window.localStorage.getItem("todo")) {
  arrayTask = JSON.parse(localStorage.getItem("todo"));
}

clear.addEventListener("click", () => {
  complete.classList.remove("fo");
  active.classList.remove("fo");
  all.classList.remove("fo");
  clearcom();
});

all.addEventListener("click", () => {
  complete.classList.remove("fo");
  active.classList.remove("fo");
  all.classList.add("fo");
  addtopage(arrayTask);
});

active.addEventListener("click", () => {
  all.classList.remove("fo");
  complete.classList.remove("fo");
  active.classList.add("fo");
  let filTask = arrayTask.filter((e) => e.complete != true);
  addtopage(filTask);
});

complete.addEventListener("click", () => {
  all.classList.remove("fo");
  active.classList.remove("fo");
  complete.classList.add("fo");
  let comTask = arrayTask.filter((e) => e.complete == true);
  addtopage(comTask);
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("second")) {
    //delete from local
    deletefrom(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("circle")) {
    e.target.classList.toggle("ok");
    e.target.parentElement.children[1].classList.toggle("te");
    updatefrom(e.target.parentElement.parentElement.getAttribute("data-id"));
  }
});

if (window.localStorage.getItem("theme") == "enable") {
  light.classList.add("d-none");
  dark.classList.remove("d-none");
  document.body.classList.add("dark-theme");
}

icon.addEventListener("click", () => {
  updatetheme();
  light.classList.toggle("d-none");
  dark.classList.toggle("d-none");
  document.body.classList.toggle("dark-theme");
});

input.addEventListener("change", () => {
  if (input.value != "") {
    complete.classList.remove("fo");
    active.classList.remove("fo");
    all.classList.remove("fo");
    addlist(input.value);
    input.value = "";
  }
});

const addlist = (inp) => {
  const task = {
    id: Date.now(),
    content: inp,
    complete: false,
  };

  arrayTask.push(task);

  addtopage(arrayTask);

  setlocal(arrayTask);
};

const addtopage = (arrayTask) => {
  list.innerHTML = "";
  arrayTask.forEach((element) => {
    let todo = document.createElement("div");
    todo.classList.add("todo", "d-flex", "justify-content-between");
    todo.setAttribute("data-id", element.id);
    let first = document.createElement("div");
    first.classList.add("first");
    todo.appendChild(first);
    let circle = document.createElement("div");
    circle.classList.add("circle", "text-center");
    first.appendChild(circle);
    let talk = document.createElement("div");
    talk.innerHTML = element.content;
    talk.classList.add("talk");
    first.appendChild(talk);
    if (element.complete) {
      circle.classList.add("circle", "text-center", "ok");
      talk.classList.add("talk", "te");
    }
    let second = document.createElement("div");
    second.classList.add("second");
    todo.appendChild(second);
    list.appendChild(todo);
  });
};

const setlocal = (arrayTask) => {
  window.localStorage.setItem("todo", JSON.stringify(arrayTask));
  console.log(arrayTask.length);
  left.innerHTML = arrayTask.length;
};

const getlocal = () => {
  let data = window.localStorage.getItem("todo");
  if (data) {
    let tasks = JSON.parse(data);
    addtopage(tasks);
  }
};

getlocal();

const deletefrom = (taskdel) => {
  arrayTask = arrayTask.filter((e) => e.id != taskdel);
  setlocal(arrayTask);
};

const updatefrom = (taskupd) => {
  for (let i = 0; i < arrayTask.length; i++) {
    if (arrayTask[i].id == taskupd) {
      arrayTask[i].complete == false
        ? (arrayTask[i].complete = true)
        : (arrayTask[i].complete = false);
    }
  }
  setlocal(arrayTask);
};

const clearcom = () => {
  arrayTask = arrayTask.filter((e) => e.complete == false);
  setlocal(arrayTask);
  addtopage(arrayTask);
};

const settheme = (d) => {
  window.localStorage.setItem("theme", d);
};
settheme(darkk);

const updatetheme = () => {
  let theme = localStorage.getItem("theme");
  if (theme == "disable") {
    theme = "enable";
  } else {
    theme = "disable";
  }
  settheme(theme);
};

const setleft = (arrayTask) => {
  window.localStorage.setItem("left", arrayTask.length);
  left.innerHTML = localStorage.getItem("left");
};
setleft(arrayTask);
