const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainSection = document.querySelector('main')

document.addEventListener("DOMContentLoaded", init)
document.addEventListener("click", updateTeams)


function init(){
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => {
    trainers.forEach(addTrainer)
  })
}

function addTrainer(trainer){
  mainSection.innerHTML += `
  <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
    ${trainer.pokemons.map(pokemon => {
      return `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`}).join('')}
    </ul>
  </div>`
}

function updateTeams(e){
  e.preventDefault()
  if(e.target.innerText === 'Add Pokemon'){
    addPokemon(e)
  } else if(e.target.innerText === 'Release'){
    releasePokemon(e)
  }
}

function addPokemon(e){

  let id = parseInt(e.target.dataset.trainerId)

  let pokemonList = document.querySelector(`div[data-id="${id}"] > ul`)

  if(pokemonList.children.length < 6){
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        "Content-type": 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({trainer_id: id})
    }).then(res => res.json())
    .then(res => {
        pokemonList.innerHTML += `<li>${res.nickname} (${res.species})<button class="release" data-pokemon-id=${res.id}>Release</button></li>`
      })
  } else {
    alert('Party is full!')
  }
}

function releasePokemon(e){
  let id = parseInt(e.target.dataset.pokemonId)

  fetch(`${POKEMONS_URL}/${id}`, {
    method: 'DELETE'
  })

  e.target.parentElement.remove()

}
