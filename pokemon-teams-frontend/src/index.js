const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const pokeCont = document.querySelector('main')

/* 
 This is how you can approach manipulating the DOM with JS

 I. Try to get something on the page!
    A. First check to see if you have to make a fetch and then see what data you are working with.
    B. Find the elements you need from the DOM & save them into variables.
    C. Attach your event listeners and think about how you are handling events.
       a. If you are using innerHTML to append elements to the DOM, you'll need an event handler

 II. Refactor!!
   A. See if there are any places where you can break out fetches, or simply how you're adding items to the DOM.

*/

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(res => {  
        res.forEach(r => makeCard(r))
    })
})

document.addEventListener('click', handleEvent)

function makeCard(trainer) {
    pokeCont.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                                <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                                <ul>
                                 ${trainer.pokemons.map(p => {
                                     return `<li>${p.nickname} (${p.species}) <button class="release" data-pokemon-id="${p.id}">Release</button></li>`
                                 }).join('')}
                                </ul>
                            </div>`
}

function handleEvent(e) {

  if (e.target.innerText === 'Add Pokemon') {
      let id = e.target.dataset.trainerId

      let trainer = {
          trainer_id: id
      }
       
      fetch(POKEMONS_URL, {
          method: 'POST', 
          body: JSON.stringify(trainer), 
          headers: {
              'Content-Type': 'application/json'
          }
       })
       .then(res => res.json())
       .then(res => {
           const ul = e.target.parentElement.querySelector('ul')
           ul.innerHTML += `<li>${res.nickname} (${res.species}) <button class="release" data-pokemon-id="${res.id}">Release</button></li>`
       })
    
  } else if (e.target.innerText === 'Release') {
      let id = e.target.dataset.pokemonId
      fetch(POKEMONS_URL + `/${id}`, {
          method: 'DELETE'
      }).then(res => res.json())
      .then(res => {
          //Find the element & remove it from the page
          e.target.parentElement.remove()
      })
  }
}


