document.addEventListener('DOMContentLoaded', function() {

  const BASE_URL = `http://localhost:3000`
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`

  fetchTeams()

// --------------------------------------------------------------------------------- //

  function fetchTeams() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(renderTeam))
  }

// --------------------------------------------------------------------------------- //

  function renderTeam(trainer) {
    const main = document.getElementById('teams')

    const div = document.createElement('div')
    div.className = 'card'
    div.id = trainer.id

    const p = document.createElement('p')
    p.innerText = trainer.name

    const addButton = document.createElement('button')
    addButton.dataset.trainerId = trainer.id
    addButton.className = 'add-button'
    addButton.innerText = 'Add Pokemon'
    addButton.addEventListener('click', function() {
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accepts: 'application/json'},
        body: JSON.stringify({trainer_id: trainer.id})
      })
      .then(resp => resp.json())
      .then(json => appendPokemon(json))
    })

    const ul =  document.createElement('ul')
    ul.className = 'pokemon-ul'

    main.appendChild(div)
    div.appendChild(p)
    div.appendChild(addButton)
    div.appendChild(ul)
    
    trainer.pokemons.forEach(appendPokemon)
  }

// --------------------------------------------------------------------------------- //

  function appendPokemon(pokemon) {
    const ul = document.getElementById(pokemon.trainer_id)
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    const releaseButton = document.createElement('button')
    releaseButton.innerText = 'Release'
    releaseButton.className = 'release'
    releaseButton.dataset.id = pokemon.id

    releaseButton.addEventListener('click', releasePokemon)

    li.appendChild(releaseButton)
    ul.appendChild(li)
  }

// --------------------------------------------------------------------------------- //

  function releasePokemon(e) {
    fetch(`${POKEMONS_URL}/${e.target.dataset.id}`, {method: 'DELETE'})
    e.target.parentElement.remove()
  }

// --------------------------------------------------------------------------------- //

})