class UI {
  constructor() {
    this.excercises = document.querySelector('#excercises')
    this.excerciseName = document.querySelector('#excercise-name')
    this.sets = document.querySelector('#sets')
    this.reps = document.querySelector('#reps')
    this.idInput = document.querySelector('#id')
    this.idInput = document.querySelector('#id')
    this.excerciseSubmit = document.querySelector('.excercise-submit')
  }

  showExcercises(excercises) {
    let output = ''

    excercises.forEach((excercise) => {
      output += `
      <div class="card mb-3">
      <div class="card-body">
        <h4 class="card-title">${excercise.name}</h4>
        <p class="card-text">Sets: ${excercise.sets}</p>
        <p class="card-text">Reps: ${excercise.reps}</p>
        <a href="#" class="edit card-link" data-id="${excercise.id}">
          <i class="fa fa-pencil"></i>
        </a>
        <a href="#" class="delete card-link" data-id="${excercise.id}">
          <i class="fa fa-remove"></i>
        </a>
      </div>
    </div>
      `
    })

    this.excercises.innerHTML = output
  }

  showAlert(message, className) {
    this.clearAlert()

  // Create div
  const div = document.createElement('div')
  // Add class name
  div.className = className
  // Add text
  div.appendChild(document.createTextNode(message))
  // Get parent 
  const container = document.querySelector('.excercisesContainer')
  // Insert alert div
  container.insertBefore(div, this.excercises)

  // Set timeout
  setTimeout(() => {
    this.clearAlert()
  }, 3000)
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert')

    if(currentAlert) {
      currentAlert.remove()
    }
  }

  clearFields() {
    this.excerciseName.value = ''
    this.sets.value = ''
    this.reps.value = ''
  }
}

export const ui = new UI()