class UI {
  constructor() {
    this.excersises = document.querySelector('#excercises')
    this.excersiseName = document.querySelector('#excersise-name')
    this.sets = document.querySelector('#sets')
    this.reps = document.querySelector('#reps')
    this.idInput = document.querySelector('#id')
    this.idInput = document.querySelector('#id')
    this.excerciseSubmit = document.querySelector('.excercise-submit')
  }

  showExcercises(excersises) {
    let output = ''

    excersises.forEach((excercise) => {
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

    this.excersises.innerHTML = output
  }
}

export const ui = new UI()