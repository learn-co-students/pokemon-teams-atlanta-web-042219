const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const deletePokemon = (e, pokemon) => {
  const pokemonIdToDelete = e.target.parentElement.dataset.pokemonId

  fetch(`${POKEMONS_URL}/${pokemonIdToDelete}`, {
    method: 'DELETE'
  })
  e.target.parentElement.remove()

}

const addPokemonToList = (pokemon, trainerId) => {
  // pokemon = {trainer_id: 1, name: "Pikachu"}

  // I need to find the UL of pokemon for trainer 1 andd append a new LI
  const trainerUL = document.querySelector(`div[data-id='${trainerId}'] ul`)
  const pokemonLI = document.createElement("li")
  const delbtn = document.createElement('button')

  pokemonLI.innerText = `${pokemon.nickname} (${pokemon.species})`
  pokemonLI.setAttribute("data-pokemon-id", `${pokemon.id}`)
  delbtn.setAttribute("data-pokemon-id", `${pokemon.id}`)
  delbtn.className = "release"
  delbtn.innerText = "Release"
  delbtn.addEventListener("click", deletePokemon)

  pokemonLI.appendChild(delbtn)
  trainerUL.appendChild(pokemonLI)

  // const trainerDiv = document.querySelector(`div[data-trainer-id='${pokemon.trainer_id}']`)

}

const addPokemonToTrainer = (e) => {
  // I need to know which trainer they are adding a pokemon too
  // SUBMIT a POST /pokemons and pass the trainer id as trainer_id in the Body
  const trainerId = e.target.dataset.trainerId
// debugger
  if (e.target.parentElement.childElementCount > 6){
    alert("Party is full!")
  }
  else{
  fetch(POKEMONS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({pokemon: {trainer_id: trainerId}})
  }).then(res => res.json())
    .then(function(pokemon){
      addPokemonToList(pokemon, trainerId)
    })
  }
  // The response will be the added pokemon
}

const addTrainerCard = (trainer) => {
  const main = document.querySelector("#main")
  const div = document.createElement('div')
  const ul = document.createElement('ul')
  const addbtn = document.createElement('button')

  addbtn.setAttribute("data-trainer-id", `${trainer.id}`)
  addbtn.innerText = "Add Pokemon"
  addbtn.addEventListener("click", addPokemonToTrainer)

  //////////////////////////////////////////////////////////


  div.className = "card"
  div.innerHTML = `<p>${trainer.name}</p>`
  div.setAttribute("data-id", `${trainer.id}`)

  ul.appendChild(addbtn)
  main.appendChild(div)
  div.appendChild(ul)


  const pokemons = trainer.pokemons
  pokemons.forEach(function(pokemon){
    addPokemonToList(pokemon, trainer.id)
  })


}



const loadTrainers = () => {

  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(res => res.forEach(addTrainerCard))
}

document.addEventListener("DOMContentLoaded", loadTrainers)
