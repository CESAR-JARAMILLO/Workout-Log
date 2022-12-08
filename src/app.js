import { http } from './http'
import { ui } from './ui'

// Get excercises on DOM load
document.addEventListener('DOMContentLoaded', getExcercises)

// Listen for excercise submit
ui.excerciseSubmit.addEventListener('click', addExcercise)


// Listen for delete
ui.excercises.addEventListener('click', deleteExcercise)


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
  
  const data = {
    name,
    sets,
    reps
  }

  http.post('http://localhost:3000/Excercises', data)
    .then(data => {
      ui.showAlert('Excercise Added', 'alert alert-success')
      ui.clearFields()
      getExcercises()
    })
    .catch(err => console.log(err))
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