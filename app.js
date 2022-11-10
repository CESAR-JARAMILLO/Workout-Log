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
    `

    workoutList.appendChild(row)
  }

  deleteWorkout(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove()
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
    const books = Store.getWorkouts()

    books.forEach(function(workout) {
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
        console.log(index, name)
        workouts.splice(index, 1)
        return
      }
    })

    localStorage.setItem('workouts', JSON.stringify(workouts))
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
    console.log(name, sets, reps)
  }

  // Add to workout list
  ui.addToWorkoutList(workout)

  // Add to Local Storage
  Store.addWorkout(workout)

  // Clear fields
  ui.clearFields()



  e.preventDefault()
})

// Delete event listener
document.getElementById('workout-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI()

  // Delete from workout list
  ui.deleteWorkout(e.target)

  // Remove from Local Storage
  const name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
  const sets = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
  const reps = e.target.parentElement.previousElementSibling.textContent
  Store.removeWorkout(name, sets, reps)

  e.preventDefault()
})

