import "./styles.css";

document.querySelector("#closeButton").onclick = function () {
    closeForm();
};

const formtoCreateTask = (projectArray) => {
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
        createTask(title, date, time, description, priority, projectArray);
        closeForm();
    }
}

let projects = (name) => {
    const getName = () => name;
    const tasks = [];

    return { getName, tasks };
};

document.querySelector("#newListButton").onclick = function () {
    const listContainer = document.querySelector("#toDoContainer");
    const newList = document.createElement("div");
    newList.setAttribute(
        "class",
        "mb-4 box-border cursor-pointer h-24 w-full rounded-md font-Bree_Serif text-center text-5xl pt-5 bg-cultured"
    );
    const newListValues = document.getElementById("newListInput").value;
    newList.setAttribute("data-id", `${newListValues}`);
    if (newListValues == "") {
        newList.textContent = "new list";
    } else {
        newList.textContent = newListValues;
        document.getElementById("newListInput").value = "";

        let newProject = projects(`${newListValues}`);
        const projectName = newProject.getName();
        const projectArray = newProject.tasks
        console.log(projectArray)

      //  const openProject = (projectName) => {
      //      const project = document.querySelector(`[data-id="${projectName}"]`);
      //      console.log(project);
     //   };

        newList.onclick = function () {
         //   openProject(projectName);
             const listContainer = document.querySelector("#listContainer")
             listContainer.setAttribute("data-id", `${projectName}`)
             listContainer.classList.remove("hidden")
             console.log(open)
             document.querySelector("#taskSubmit").onclick = function () {formtoCreateTask(projectArray)};
            
        };
    }
    listContainer.appendChild(newList);
};

document.querySelector("#newTaskButton").onclick = function () {
    openForm();
};

function closeForm() {
    console.log("closing form");
    const form = document.querySelector("#formContainer");
    form.classList.add("hidden");
    form.classList.remove("grid");
}

function openForm() {
    console.log("opening form");
    const form = document.querySelector("#formContainer");
    form.classList.remove("hidden");
    form.classList.add("grid");
}

//let myTasks = [];

class Task {
    constructor(title, date, time, description, priority, project) {
        this.title = title;
        this.date = date;
        this.time = time;
        this.description = description;
        this.priority = priority;
        this.project = project;
    }
}

const createTask = (title, date, time, description, priority, projectArray) => {
    let task = new Task(title, date, time, description, priority);
    projectArray.push(task);

    const removepreviousTasks = (() => {
        const allTasks = document.querySelectorAll("#taskContainer");
        allTasks.forEach((task) => {
            task.remove();
        });
    })();

    projectArray.forEach((task) => {
        const listContainer = document.querySelector("#listContainer");
        const taskContainer = document.createElement("div");
        taskContainer.setAttribute(
            "class",
            "m-3 h-52 w-48 overflow-hidden box-border border-[6px] border-greenBlueCrayola shadow-xl rounded-lg bg-opal p-4"
        );
        taskContainer.setAttribute("id", "taskContainer");
        listContainer.appendChild(taskContainer);

        const taskDate = document.createElement("p");
        taskDate.setAttribute("class", "text-left font-Bree_Serif text-2xl");
        taskDate.textContent = `${task.date} ${task.time}`;
        taskContainer.appendChild(taskDate);

        const taskTitle = document.createElement("h1");
        taskTitle.setAttribute("class", "m-1 text-left font-Bree_Serif text-xl");
        taskTitle.textContent = task.title;
        taskContainer.appendChild(taskTitle);

        const taskDescription = document.createElement("p");
        taskDescription.setAttribute("class", "border-t-8 border-dotted border-cultured text-sm");
        taskDescription.textContent = task.description;
        taskContainer.appendChild(taskDescription);
    });
};

//createTask("homeowrk", "2026-07-15", "15:06", "math homework", "medium");
//createTask("tuition", "2026-07-30", "08:06", "science homework", "medium");
