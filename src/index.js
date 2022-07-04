import './styles.css'


document.querySelector("#closeButton").onclick = function() {closeForm()}

function closeForm()  {
    console.log("closing form")
   const form = document.querySelector("#formContainer")
   form.classList.add("hidden")

  
}

