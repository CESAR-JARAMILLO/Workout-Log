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
}

export const ui = new UI()