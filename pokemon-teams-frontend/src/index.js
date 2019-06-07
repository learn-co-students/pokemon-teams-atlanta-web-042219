
document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = `http://localhost:3000`
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`
  const main = document.querySelector('main')

  document.addEventListener('click', handleEvents)

  getTrainers();

// -------------------------------------------------------------- //

  function getTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(showTrainers)
    })
  }

// -------------------------------------------------------------- //

  function showTrainers(trainer){
    let pokemonLi = ''
    trainer.pokemons.forEach(pokemon => {
      pokemonLi += `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
    })

    main.innerHTML +=
    `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul> ${pokemonLi}</ul>
    </div>`
  }

// -------------------------------------------------------------- //

  function handleEvents(e) {
    const trainerID = e.target.parentElement.dataset.id
    const pokemon = e.target.parentElement

    if (e.target.innerText === 'Add Pokemon') {
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accepts: 'application/json'
        },
        body: JSON.stringify({
          trainer_id: trainerID
        })
      })
      .then(res => res.json())
      .then(res => {
        newPokemon = e.target.nextSibling.nextSibling
        newPokemon.innerHTML +=
          `<li> ${res.nickname} (${res.species}) <button class="release" data-pokemon-id=${res.id}>Release</button></li>`
      })
    }
    
    else if (e.target.innerText === 'Release') {
      fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
        method: 'DELETE'
      })
      pokemon.remove()
    }
  }

// FINAL BRACKETS BELOW ----------------------------------------- //

})