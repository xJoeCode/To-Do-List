import "./styles.css";

document.querySelector("#closeButton").onclick = function () {
    closeForm();
};
document.querySelector("#taskSubmit").onclick = function () {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    if (title == "") {
        alert("Title fields are empty");
    } else if (date == "") {
        alert("Date fields are empty");
    } else if (time == "") {
        alert("Time fields are empty");
    } else {
        pushToArray(title, date, time, description, priority);
        closeForm()
    }
};

document.querySelector("#newListButton").onclick = function(){
    const listContainer = document.querySelector("#toDoContainer")
     const newList = document.createElement("div")
     newList.setAttribute("class","mb-4 box-border h-24 w-full rounded-md font-Bree_Serif text-center text-5xl pt-5 bg-cultured")
    const newListValues = document.getElementById("newListInput").value
    if (newListValues == ""){
        newList.textContent = "new list"
    } else {
        newList.textContent = newListValues
        document.getElementById("newListInput").value = ''
    }
     listContainer.appendChild(newList)
}

document.querySelector("#newTaskButton").onclick = function() {
    openForm()
}

function closeForm() {
    console.log("closing form");
    const form = document.querySelector("#formContainer");
    form.classList.add("hidden");
    form.classList.remove("grid")
}

function openForm(){
    console.log("opening form");
    const form = document.querySelector("#formContainer");
    form.classList.remove("hidden");
    form.classList.add("grid")

}

let myTasks = [];

class Task {
    constructor(title, date, time, description, priority) {
        this.title = title;
        this.date = date;
        this.time = time;
        this.description = description;
        this.priority = priority;
    }
}

const pushToArray = (title, date, time, description, priority) => {
    let task = new Task(title, date, time, description, priority);
    myTasks.push(task);
    console.table(myTasks);
};

pushToArray("homeowrk","2026-07-15","15:06","math homework", "medium")

console.table(myTasks[0])

myTasks.forEach(task => 
document.createElement('div')
    )
