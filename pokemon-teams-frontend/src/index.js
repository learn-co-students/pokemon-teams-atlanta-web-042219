const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
  const main = document.querySelector('main')
  document.addEventListener('click', handleClicks)

  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainers => trainers.forEach(addTrainer))

  function addTrainer(trainer) {
    main.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
      ${ trainer.pokemons.map(pokemon => addPokemon(pokemon)).join(" ") }
    </ul>
    </div>`
  }

  function addPokemon(pokemon) {
    let pokemon_li = ''
    return pokemon_li += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  }

  function handleClicks(e) {
    if(e.target.innerText === "Add Pokemon"){
      createPokemon(e.target.dataset.trainerId, e)
    }
    if(e.target.classList.value === "release"){
      releasePokemon(e.target)
    }
  }

  function createPokemon(trainerId, e) {
    const ul = e.target.parentElement.querySelector('ul')
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({trainer_id: trainerId})
    })
    .then(resp => resp.json())
    .then(json => json.error ? alert(json.error) : ul.innerHTML += addPokemon(json))
  }

  function releasePokemon(target){
    fetch(`${POKEMONS_URL}/${target.dataset.pokemonId}`, {
      method: 'DELETE' })
      .then(resp => resp.json())
      .then(json => { if(!json.error) target.parentElement.remove() })
      .catch(() => alert("boooo!"))
  }
})

