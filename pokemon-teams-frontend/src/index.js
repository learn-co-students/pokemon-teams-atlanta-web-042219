document.addEventListener('DOMContentLoaded', function(){
	// vars
	const BASE_URL = 'http://localhost:3000'
	const TRAINERS_URL = `${BASE_URL}/trainers`
	const POKEMONS_URL = `${BASE_URL}/pokemons`
	const FORM = document.getElementById('add-pokemon-form')

	// main
	fetch_trainers()
	document.addEventListener('click', handleClickEvents)

	// methods
	function fetch_trainers() {
		return fetch(TRAINERS_URL)
		.then(resp => resp.json())
		.then( json => json.forEach(display_trainers) )
	}

	function display_trainers(trainer) {
		let poke_li = ''
		trainer.pokemons.forEach(pm => poke_li += `<li>${pm.nickname} (${pm.species}) <button class="release" data-pokemon-id="${pm.id}">Release</button></li>`)

		document.querySelector('main').innerHTML += `
			<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
			  <button class="add_pokemon_btn" data-trainer-id="${trainer.id}">Add Pokemon</button>
			  <ul>
			    ${poke_li}
			  </ul>
			</div>
		`
	}

	function handleClickEvents(e) {
		if (e.target.className === 'add_pokemon_btn') add_pokemon(e.target.parentElement)
		else if (e.target.className === 'release') delete_pokemon(e.target)
	}

	function add_pokemon(trainer_div) {
		fetch('http://localhost:3000/pokemons',{
	    method: 'POST',
	    headers: {
	      'Content-Type':'application/json',
	      Accept: 'application/json'
	    },
	    body: JSON.stringify( {trainer_id: trainer_div.dataset.id} )
		})
		.then(resp => resp.json())
		.then(pm => { pm.error ? alert(pm.error) : trainer_div.children[2].innerHTML += `<li>${pm.nickname} (${pm.species}) <button class="release" data-pokemon-id="${pm.id}">Release</button></li>`})
		.catch(error => console.log('Error during POST: ', error))
	}

	function delete_pokemon(button) {
		fetch(`http://localhost:3000/pokemons/${button.dataset.pokemonId}`,{ method: 'DELETE' })
		.then(resp => { if(!resp.errors) button.parentElement.remove() })
		.catch(error => console.log('Error during DELETE: ', error))
	}

//END
})
