const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
  fetchTeams()
})

function fetchTeams() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  // .then(console.log)
  .then(addTrainers)
}

function addTrainers(data) {
  data.forEach(trainer => showTrainer(trainer))
}

function showTrainer(trainer) {

    const main = document.querySelector('main')

    const div = document.createElement('div')
    div.className = 'card'
    // div.id = trainer.id

    const p = document.createElement('p')
    p.innerText = trainer.name

    const add_btn = document.createElement('button')
    add_btn.className = 'add_btn'
    add_btn.dataset.trainerId = trainer.id
    add_btn.innerText = 'Catch Pokemon'
    add_btn.addEventListener('click', function(){
      fetch(POKEMONS_URL,{
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ trainer_id: trainer.id }) 
      })
      .then(res => res.json())
      .then(append_pokemon_li)
      // .catch(console.log)
    })

    const ul = document.createElement('ul')
    ul.id = trainer.id

    //append
    main.appendChild(div)
    div.appendChild(p)
    div.appendChild(add_btn)
    div.appendChild(ul)

    trainer.pokemons.forEach(append_pokemon_li) 

    // alternative method of displaying Pokemons
// let pokemon_list_items = ''
// trainer.pokemons.forEach(pm => {
//   pokemon_list_items += `<li>${pm.nickname} (${pm.species}) <button class="release" data-pokemon-id="${pm.id}">Release</button></li>`
// })

// main.innerHTML += `
//   <div class="card" data-id="1"><p>${trainer.name}</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     ${pokemon_list_items}
//   </ul>
//   </div>
// `
}

function append_pokemon_li(pokemon) {
      const li = document.createElement('li')
      const ul = document.getElementById(pokemon.trainer_id)
      li.innerText = `${pokemon.nickname} (${pokemon.species})`

      const release_btn = document.createElement('button')
      release_btn.innerText = "Release"
      release_btn.className = 'release'
      release_btn.dataset.id = pokemon.id

      release_btn.addEventListener('click', release_pokemon)

      li.appendChild(release_btn)
      ul.appendChild(li)
}

function release_pokemon(e) {
  // console.log(e.target)

  fetch(POKEMONS_URL+'/'+e.target.dataset.id, {
    method: 'DELETE'
  })
  e.target.parentElement.remove()
}



