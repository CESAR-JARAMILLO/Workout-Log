class UI {
  constructor() {
    this.excercises = document.querySelector('#excercises')
    this.excerciseName = document.querySelector('#excercise-name')
    this.sets = document.querySelector('#sets')
    this.reps = document.querySelector('#reps')
    this.idInput = document.querySelector('#id')
    this.excerciseSubmit = document.querySelector('.excercise-submit')
  }

  // Show excercises
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

  // Show alert
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

  // Clear alert
  clearAlert() {
    const currentAlert = document.querySelector('.alert')

    if(currentAlert) {
      currentAlert.remove()
    }
  }

  // Clear all fields
  clearFields() {
    this.excerciseName.value = ''
    this.sets.value = ''
    this.reps.value = ''
  }

  // Fill form to edit
  fillForm(data) {
    this.excerciseName.value = data.excerciseName
    this.sets.value = data.sets
    this.reps.value = data.reps
    this.idInput = data.id

    this.changeFormState('edit')
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput = ''
  }

  // Change the form state
  changeFormState(type) {
    if(type === 'edit') {
      this.excerciseSubmit.textContent = 'Update Excercise'
      this.excerciseSubmit.className = 'excercise-submit btn btn-warning btn-block'

      // Create cancel button
      const button = document.createElement('button')
      button.className = 'excercise-cancel btn btn-light btn-block'
      button.appendChild(document.createTextNode('Cancel Edit'))

      // Get parent
      const cardForm = document.querySelector('.card-form')
      // get element to insert before
      const formEnd = document.querySelector('.form-end')
      // Insert button
      cardForm.insertBefore(button, formEnd)
    } else {
      this.excerciseSubmit.textContent = 'Submit Excercise'
      this.excerciseSubmit.className = 'excercise-submit btn btn-primary btn-block'

      // Remove cancel btn if it's there
      if(document.querySelector('.excercise-cancel')) {
        document.querySelector('.excercise-cancel').remove()
      }
      // Clear id from hidden field
      this.clearIdInput()
      // Clear text
      this.clearFields()
    }
  }
}

export const ui = new UI()