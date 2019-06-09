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
			</div>`
	}

	function handleClickEvents(e) {
		if (e.target.className === 'add_pokemon_btn') add_pokemon(e.target)
		else if (e.target.className === 'release') delete_pokemon(e.target)
	}

	function add_pokemon(add_btn) {
		fetch('http://localhost:3000/pokemons',{
			method: 'POST',
	    headers: { 'Content-Type':'application/json' },
	    body: JSON.stringify( {trainer_id: add_btn.dataset.trainerId} )
		})
		.then(resp => resp.json())
		.then(pm => { pm.error ? alert(pm.error) : add_btn.nextSibling.nextSibling.innerHTML += `<li>${pm.nickname} (${pm.species}) <button class="release" data-pokemon-id="${pm.id}">Release</button></li>`})
		.catch(error => console.log('Error during POST: ', error))
	}

	function delete_pokemon(del_btn) {
		fetch(`http://localhost:3000/pokemons/${del_btn.dataset.pokemonId}`,{ method: 'DELETE' })
		.then(resp => { if(!resp.errors) del_btn.parentElement.remove() })
		.catch(error => console.log('Error during DELETE: ', error))
	}

//END
})
