import { list } from "postcss";
import star from "./Assets/star.png";
import "./styles.css";

document.querySelector("#closeButton").onclick = function () {
    closeForm();
};
document.querySelector("#closeButton2").onclick = function () {
    closeListPage();
};
document.querySelector("#closeButton3").onclick = function () {
    closeEditForm();
};
document.querySelector("#newTaskButton").onclick = function () {
    openForm();
};
function closeForm() {
    const form = document.querySelector("#formContainer");
    form.classList.add("hidden");
    form.classList.remove("grid");
}
function closeListPage() {
    const form = document.querySelector("#listContainer");
    form.classList.add("hidden");
    form.classList.remove("flex");
}
function openListPage() {
    const form = document.querySelector("#listContainer");
    form.classList.add("flex");
    form.classList.remove("hidden");
}
function openForm() {
    const form = document.querySelector("#formContainer");
    form.classList.remove("hidden");
    form.classList.add("grid");
}

function openEditForm() {
    const form = document.querySelector("#editFormContainer");
    form.classList.remove("hidden");
    form.classList.add("grid");
}

function closeEditForm() {
    const form = document.querySelector("#editFormContainer");
    form.classList.remove("grid");
    form.classList.add("hidden");
}

let lists = {};

const getListName = (() => {
    document.querySelector("#newListButton").onclick = function () {
        const listName = document.getElementById("newListInput").value;
        generateNewList(listName);
    };
})();

const generateNewList = (listName) => {
    if (listName == "") {
        alert("Inputs are empty, kindly check values and try again");
    } else {
        const listContainer = document.querySelector("#toDoContainer");
        const newList = document.createElement("div");
        newList.setAttribute(
            "class",
            "mb-4 box-border cursor-pointer h-24 w-3/4 rounded-md font-Bree_Serif text-center text-5xl pt-5 bg-cultured hover:bg-[#FFC51C] duration-200 ease-in-out"
        );

        newList.setAttribute("data-id", `${listName}`);
        newList.textContent = listName;
        document.getElementById("newListInput").value = "";

        lists[`${listName}`] = [];
        console.log(lists);

        newList.onclick = function () {
            generateListPage(listName);
        };

        const generateListPage = (listName) => {
            const listContainer = document.querySelector("#listContainer");
            const listHeader = document.querySelector("#listContainerHeader");
            listHeader.textContent = listName;
            listContainer.setAttribute("data-id", `${listName}`);
            openListPage();
            generateTasks(listName);
            document.querySelector("#taskSubmit").onclick = function () {
                formtoCreateTask(listName);
            };
        };
        listContainer.appendChild(newList);
    }
};

const formtoCreateTask = (listName) => {
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
        createTask(title, date, time, description, priority, listName);
        closeForm();
    }
};

const formtoEditTask = (task, listName) => {
    openEditForm();

    let editTitle = document.getElementById("editTitle");
    let editDate = document.getElementById("editDate");
    let editTime = document.getElementById("editTime");
    let editDescription = document.getElementById("editDescription");
    let editPriotity = document.getElementById("editPriority");

    editTitle.value = task.title;
    editDate.value = task.date;
    editTime.value = task.time;
    editDescription.value = task.description;
    editPriotity.value = task.priority;

    document.querySelector("#editTaskButton").onclick = function () {
        editTask(editTitle, editDate, editTime, editDescription, editPriotity, task, listName);
    };
    document.querySelector("#removeTaskButton").onclick = function () {
        removeTask(task, listName)
    }
};

class Task {
    constructor(title, date, time, description, priority) {
        this.title = title;
        this.date = date;
        this.time = time;
        this.description = description;
        this.priority = priority;
    }
}

const editTask = (editTitle, editDate, editTime, editDescription, editPriority, task, listName) => {
    const taskToBeEdited = lists[`${listName}`].find((taskToBeEdited) => (taskToBeEdited.title = task.title));
    const taskindex = lists[`${listName}`].findIndex((number) => number === task);
    console.log(taskindex);

    if (editTitle.value == "") {
        alert("Title fields are empty");
    } else if (editDate.value == "") {
        alert("Date fields are empty");
    } else if (editTime.value == "") {
        alert("Time fields are empty");
    } else {
        const taskContainer = document.querySelector(`[data-id='${listName + lists[`${listName}`].findIndex((number) => number === task)}']`);
        console.log(taskContainer);
        const dateTime = taskContainer.querySelector("p:first-of-type");
        const title = taskContainer.querySelector("h1:first-of-type");
        const description = taskContainer.querySelector("p:nth-of-type(2)");
        dateTime.textContent = `${editDate.value} ${editTime.value}`;
        title.textContent = editTitle.value;
        description.textContent = editDescription.value;

        const highPriorityIconContainer = taskContainer.querySelector("#highPriority");

        console.log(taskToBeEdited);
        console.table(lists);

        if (editPriority.value == "high" && highPriorityIconContainer == null) {
            console.log("settinghighpriority");
            const highPriorityIcon = document.createElement("img");
            highPriorityIcon.src = star;
            highPriorityIcon.setAttribute("class", "absolute  top-0 left-0 w-6 m-2 ml-3 h-6");
            highPriorityIcon.setAttribute("id", "highPriority");
            taskContainer.appendChild(highPriorityIcon);
        } else if (editPriority.value == "medium" && highPriorityIconContainer != null) {
            const highPriorityIcon = taskContainer.querySelector("img");
            highPriorityIcon.remove();
        }

        taskToBeEdited.title = editTitle.value;
        taskToBeEdited.date = editDate.value;
        taskToBeEdited.time = editTime.value;
        taskToBeEdited.description = editDescription.value;
        taskToBeEdited.priority = editPriority.value;

        closeEditForm();
    }
};

const removeTask = (task, listName) => {
    const taskContainer = document.querySelector(`[data-id='${listName + lists[`${listName}`].findIndex((number) => number === task)}']`);
    taskContainer.remove()
    let listArray = lists[`${listName}`]
    console.log( listArray)
    lists[`${listName}`] = lists[`${listName}`].filter(taskToBeRemoved => taskToBeRemoved != task)
    closeEditForm()
}

const createTask = (title, date, time, description, priority, listName) => {
    let task = new Task(title, date, time, description, priority);

    //task.id = lists[`${listName}`].length

    lists[`${listName}`].push(task);

    generateTasks(listName);
    console.log(lists);
};

const generateTasks = (listName) => {
    const removepreviousTasks = (() => {
        const allTasks = document.querySelectorAll("#taskContainer");
        allTasks.forEach((task) => {
            task.remove();
        });
    })();

    let currentList = lists[`${listName}`];

    currentList.forEach((task) => {
        const listContainer = document.querySelector("#listContainer");
        const taskContainer = document.createElement("div");
        if (task.priority == "high") {
            const highPriorityIcon = document.createElement("img");
            highPriorityIcon.src = star;
            highPriorityIcon.setAttribute("class", "absolute  top-0 left-0 w-6 m-2 ml-3 h-6");
            highPriorityIcon.setAttribute("id", "highPriority");
            taskContainer.appendChild(highPriorityIcon);
        }
        taskContainer.setAttribute(
            "class",
            "m-3 pt-8 h-52 w-48 border-[6px] border-greenBlueCrayola relative shadow-xl cursor-pointer rounded-lg bg-opal hover:bg-[#FFE5B8] duration-200 ease-in-out p-4"
        );
        taskContainer.setAttribute("id", "taskContainer");
        taskContainer.setAttribute("data-id", `${ listName + currentList.findIndex((number) => number === task)}`);
        taskContainer.onclick = function () {
            formtoEditTask(task, listName);
        };
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

generateNewList("Tuition");
createTask("homeowrk", "2026-07-15", "15:06", "math homework", "medium", "Tuition");
createTask("tuition", "2026-07-30", "08:06", "science homework", "medium", "Tuition");
