document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = `http://localhost:3000`
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`
  const main = document.querySelector('main')

  fetch(TRAINERS_URL)
    .then(res => res.json())
    // .then(console.log)
    .then(data => {
      data.forEach(addTrainer)
      // data.forEach(console.log("DATA", data[0]['pokemons'][0].trainer_id))
    })

// -------------------------------------------------------------- //

  function addTrainer(trainer){
    let pokemonLi = ''
    trainer.pokemons.forEach(pokemon => {
      pokemonLi += `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
    })

    main.innerHTML +=
    `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul>
        ${pokemonLi}
      </ul>
    </div>`
  }

// -------------------------------------------------------------- //

  function addPokemon() {
    
  }  

// -------------------------------------------------------------- //
// FINAL BRACKETS BELOW

})