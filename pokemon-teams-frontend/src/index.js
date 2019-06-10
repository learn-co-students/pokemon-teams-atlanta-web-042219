const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const container = document.querySelector('#container')

document.addEventListener('DOMContentLoaded', init)
document.addEventListener('click', handleEvent)

function init() {
    getTrainers()
}

function getTrainers() {
    return fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(res => {
        res.forEach(trainer => makeCards(trainer))
    })
}

function makeCards(trainer) {
    let card = `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul id="pokemon"> 
         ${trainer.pokemons.map(p => {
             return `<li>${p.nickname} (${p.species}) <button class="release" data-pokemon-id="${p.id}">Release</button></li>`
         }).join('')}
        </ul>
    </div>
    `
   container.innerHTML += `${card}`
}

function handleEvent(e) {
  if (e.target.className === 'release') {
      let id  = e.target.dataset.pokemonId
      fetch(POKEMONS_URL + `/${id}`, {
          method: 'DELETE'
      })
      .then(res => res.json())
      .then(res => {
       // For optimistic rendering
         e.target.parentElement.remove()
      })
    } else if (e.target.innerText === 'Add Pokemon'){
        
        // For optimistic rendering
        let card = e.target.parentElement
        let pokeCont = card.querySelector('#pokemon') 
      
      let id = e.target.dataset.trainerId
      fetch(POKEMONS_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "trainer_id": id})
        }).then(res => res.json())
        .then(res => {
            // For optimistic rendering
            pokeCont.innerHTML += `<li>${res.nickname} (${res.species}) <button class="release" data-pokemon-id="${res.id}">Release</button></li>`
        })
  }
}


