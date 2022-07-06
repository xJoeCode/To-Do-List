import "./styles.css";

document.querySelector("#closeButton").onclick = function () {
    closeForm();
};
document.querySelector("#closeButton2").onclick = function () {
    closeProjectPage();
};
document.querySelector("#newTaskButton").onclick = function () {
    openForm();
};
function closeForm() {
    const form = document.querySelector("#formContainer");
    form.classList.add("hidden");
    form.classList.remove("grid");
}
function closeProjectPage() {
    const form = document.querySelector("#listContainer");
    form.classList.add("hidden");
    form.classList.remove("flex");
}
function openProjectPage() {
    const form = document.querySelector("#listContainer");
    form.classList.add("flex");
    form.classList.remove("hidden");
}
function openForm() {
    const form = document.querySelector("#formContainer");
    form.classList.remove("hidden");
    form.classList.add("grid");
}



let projects = {};

const getProjectName = (() => {
    document.querySelector("#newListButton").onclick = function () {
        const projectName = document.getElementById("newListInput").value;
        generateNewProject(projectName);
    };
})();



const generateNewProject = (projectName) => {
    if (projectName == "") {
        alert("Inputs are empty, kindly check values and try again");
    } else {
        const listContainer = document.querySelector("#toDoContainer");
        const newList = document.createElement("div");
        newList.setAttribute(
            "class",
            "mb-4 box-border cursor-pointer h-24 w-3/4 rounded-md font-Bree_Serif text-center text-5xl pt-5 bg-cultured hover:bg-[#FFC51C] duration-200 ease-in-out"
        );

        newList.setAttribute("data-id", `${projectName}`);
        newList.textContent = projectName;
        document.getElementById("newListInput").value = "";

        projects[`${projectName}`] = [];
        console.log(projects);

        newList.onclick = function(){generateProjectPage(projectName)}

         const generateProjectPage = (projectName) => {
            const listContainer = document.querySelector("#listContainer");
            const projectHeader = document.querySelector("#listContainerHeader");
            projectHeader.textContent = projectName;
            listContainer.setAttribute("data-id", `${projectName}`);
            openProjectPage()
            generateTasks(projectName);
            document.querySelector("#taskSubmit").onclick = function () {
                formtoCreateTask(projectName);
                };
            }
        listContainer.appendChild(newList);
    }
};

const formtoCreateTask = (projectName) => {
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
        createTask(title, date, time, description, priority, projectName);
        closeForm();
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

const createTask = (title, date, time, description, priority, projectName) => {
    let task = new Task(title, date, time, description, priority);

    projects[`${projectName}`].push(task);

    generateTasks(projectName);
    console.log(projects);
};

const generateTasks = (projectName) => {
    const removepreviousTasks = (() => {
        const allTasks = document.querySelectorAll("#taskContainer");
        allTasks.forEach((task) => {
            task.remove();
        });
    })();

    projects[`${projectName}`].forEach((task) => {
        const listContainer = document.querySelector("#listContainer");
        const taskContainer = document.createElement("div");
        taskContainer.setAttribute(
            "class",
            "m-3 h-52 w-48 border-[6px] border-greenBlueCrayola shadow-xl rounded-lg bg-opal p-4"
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



generateNewProject("Tuition")
createTask("homeowrk", "2026-07-15", "15:06", "math homework", "medium","Tuition");
createTask("tuition", "2026-07-30", "08:06", "science homework", "medium","Tuition");
