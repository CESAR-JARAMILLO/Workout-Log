class Workout {
  constructor(name, sets, reps) {
    this.name = name
    this.sets = sets
    this.reps = reps
  }
}

class UI {
  addToWorkoutList(workout) {
    const workoutList = document.getElementById('workout-list')
    // Create row
    const row = document.createElement('tr')
    // Insert Columns
    row.innerHTML = `
      <td>${workout.name}</td>
      <td>${workout.sets}</td>
      <td>${workout.reps}</td>
      <td><a href="#" class="delete">X</a></td>
      <td><a href="#" class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>
    `

    workoutList.appendChild(row)
  }

  deleteWorkout(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  editWorkout(target) {
    if(target.parentElement.className === 'edit') {
      const editContainer = document.getElementById('edit-container')
      const mainContainer = document.getElementById('main-container')
  
      mainContainer.classList.toggle('hide')
  
      editContainer.classList.toggle('hide')
    }
  }

  removeEditForm(target) {
    const editContainer = document.getElementById('edit-container')
    const mainContainer = document.getElementById('main-container')

    if(target.className === 'btn btn-primary save-changes') {
      mainContainer.classList.toggle('hide')
  
      editContainer.classList.toggle('hide')

      alert('changes saved')
    } else if(target.className === 'btn btn-danger cancel-changes') {
      mainContainer.classList.toggle('hide')
  
      editContainer.classList.toggle('hide')

      alert('changes canceled')
    }
  }

  clearFields() {
    document.getElementById('name').value = ''
    document.getElementById('sets').value = ''
    document.getElementById('reps').value = ''
  }
}

// Local Storage
class Store {
  static getWorkouts() {
    let workouts
    if(localStorage.getItem('workouts') === null) {
      workouts = []
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'))
    }

    return workouts
  }

  static displayWorkouts() {
    const workouts = Store.getWorkouts()

    workouts.forEach(function(workout) {
      const ui = new UI

      // Add book to UI
      ui.addToWorkoutList(workout)
    })
  }

  static addWorkout(workout) {
    const workouts = Store.getWorkouts()

    workouts.push(workout)

    localStorage.setItem('workouts', JSON.stringify(workouts))
  }

  static removeWorkout(name, sets, reps) {
    const workouts = Store.getWorkouts()

    workouts.forEach(function(workout, index) {
      if(workout.name === name & workout.sets === sets & workout.reps === reps) {
        workouts.splice(index, 1)
        return
      }
    })

    localStorage.setItem('workouts', JSON.stringify(workouts))
  }

  static editWorkout(name, sets, reps) {
    const workouts = Store.getWorkouts()

    workouts[editIndex].name = name
    workouts[editIndex].sets = sets
    workouts[editIndex].reps = reps

    location.reload()
    
    localStorage.setItem('workouts', JSON.stringify(workouts))
    

    Store.displayWorkouts()
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayWorkouts)

// Event Listeners
document.getElementById('workout-form').addEventListener('submit', function(e) {
  // Collect form values
  const name = document.getElementById('name').value,
        sets = document.getElementById('sets').value,
        reps = document.getElementById('reps').value

  // Instantiate Workout
  const workout = new Workout(name, sets, reps)

  // Instantiate UI
  const ui = new UI()

  // Validate
  if(name === '' || sets === '' || reps === '') {
    console.log('Please fill fields')
  } else {
    // Add to workout list
    ui.addToWorkoutList(workout)

    // Add to Local Storage
    Store.addWorkout(workout)

    // Clear fields
    ui.clearFields()
  }

  e.preventDefault()
})

// Delete event listener
document.getElementById('workout-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI()

  // Delete from workout list
  ui.deleteWorkout(e.target)

  // Remove from Local Storage
  if(e.target.className === 'delete') {
    const name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
    const sets = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const reps = e.target.parentElement.previousElementSibling.textContent
    
    Store.removeWorkout(name, sets, reps)
  }

  e.preventDefault()
})

// Edit event listener
let editIndex
document.getElementById('workout-list').addEventListener('click', (e) => {
  const ui = new UI

  ui.editWorkout(e.target)

  if(e.target.className === 'edit') {
    const name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    const sets = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    const reps = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
    
    const workouts = Store.getWorkouts()

    workouts.forEach(function(workout) {
      if(workout.name === name || workout.sets === sets || workout.reps === reps) {
        editIndex = workouts.indexOf(workout)
      }
    })

    document.getElementById('edit-name').value = name
    document.getElementById('edit-sets').value = sets
    document.getElementById('edit-reps').value = reps
  }

  e.preventDefault()
})

document.getElementById('edit-form').addEventListener('click', (e) => {
  if(e.target.className === 'btn btn-primary save-changes') {
    // Collect form values
    const name = document.getElementById('edit-name').value,
    sets = document.getElementById('edit-sets').value,
    reps = document.getElementById('edit-reps').value

    // Instantiate Workout
    // const workout = new Workout(name, sets, reps)

    // Instantiate UI
    const ui = new UI()

    // Validate
    if(name === '' || sets === '' || reps === '') {
      console.log('Please fill fields')
    } else {
      console.log(name, sets, reps)
    }

    Store.editWorkout(name, sets, reps)

    ui.removeEditForm(e.target)
} else if(e.target.className === 'btn btn-danger cancel-changes') {
    // Instantiate UI
    const ui = new UI()
    
    ui.removeEditForm(e.target)
  }

  e.preventDefault()
})