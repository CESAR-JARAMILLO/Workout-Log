import { http } from './http'
import { ui } from './ui'

// Get excercises on DOM load
document.addEventListener('DOMContentLoaded', getExcercises)

// Listen for excercise submit
ui.excerciseSubmit.addEventListener('click', addExcercise)


// Listen for delete
ui.excercises.addEventListener('click', deleteExcercise)

// Listen for edit state change
ui.excercises.addEventListener('click', enableEdit)

// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit)


// Get Excercises
function getExcercises() {
  http.get('http://localhost:3000/Excercises')
    .then(data => ui.showExcercises(data))
    .catch(err => console.log(err))
}

// Add excercises
function addExcercise() {
  const name = ui.excerciseName.value
  const sets = ui.sets.value
  const reps = ui.reps.value
  const id = ui.idInput

  const data = {
    name,
    sets,
    reps
  }

  // Validate input
  if(name === '' || sets === '' || reps === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  } else {
    // Check for ID
    if(id === '') {
      // Create excercise
      http.post('http://localhost:3000/Excercises', data)
      .then(data => {
        ui.showAlert('Excercise Added', 'alert alert-success')
        ui.clearFields()
        getExcercises()
      })
      .catch(err => console.log(err))
    } else {
      // Update excercise
      http.put(`http://localhost:3000/Excercises/${id}`, data)
      .then(data => {
        ui.showAlert('Excercise Updated', 'alert alert-success')
        ui.changeFormState('add')
        getExcercises()
      })
      .catch(err => console.log(err))
    }
  }
}

// Remove excercise
function deleteExcercise(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id

    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/Excercises/${id}`)
        .then(data => {
          ui.showAlert('Excercise deleted', 'alert alert-success')
          getExcercises()
        })
        .catch(err => console.log(err))
    }
  }

  e.preventDefault()
}

// Enable Edit State - Using Event Delegation
function enableEdit(e) {
  if(e.target.classList.contains('edit')) {

    const id = e.target.dataset.id

    const excerciseName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent

    const sets = e.target.previousElementSibling.previousElementSibling.textContent

    const reps = e.target.previousElementSibling.textContent

    const data = {
      id,
      excerciseName,
      sets,
      reps
    }

    // Fill form with current excercise
    ui.fillForm(data)
  }

  e.preventDefault()
}

// Cancel Edit State
function cancelEdit(e) {
  if(e.target.classList.contains('excercise-cancel')) {
    ui.changeFormState('add')
  }

  e.preventDefault()
}