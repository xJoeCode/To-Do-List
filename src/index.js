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
     newList.setAttribute("class","w-full bg-cultured rounded-md mb-4 h-24 box-border")
     listContainer.appendChild(newList)
}

function closeForm() {
    console.log("closing form");
    const form = document.querySelector("#formContainer");
    form.classList.add("hidden");
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
