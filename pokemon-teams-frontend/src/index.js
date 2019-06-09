    document.addEventListener("DOMContentLoaded", ()=> {
      const BASE_URL = "http://localhost:3000"
      const TRAINERS_URL = `${BASE_URL}/trainers`
      const POKEMONS_URL = `${BASE_URL}/pokemons`

      getTrainers()

      function getTrainers() {
        fetch(TRAINERS_URL)
        .then((res) => res.json())
        .then(data => data.forEach(addTrainer))
      }

      function addTrainer(trainer) {
        const main = document.querySelector('#mainId')

        const div = document.createElement("div")
        div.id = trainer.id
        div.className = "card"

        const p = document.createElement("p")
        p.innerText = trainer.name

        const addBtn = document.createElement("button")
        addBtn.dataset.trainerId = trainer.id
        addBtn.innerText = "Add Pokemon!"
        addBtn.addEventListener("click", function(){
          fetch(POKEMONS_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({trainer_id: trainer.id })
          })
          .then(resp => resp.json())
          .then(appendPokemonLi)
        })

        const ul = document.createElement("ul")

        main.append(div)
        div.append(p)
        div.append(addBtn)
        div.append(ul)


        trainer.pokemons.forEach(appendPokemonLi)


      }

      function appendPokemonLi(pokemon) {
          const ul = document.getElementById(pokemon.trainer_id)
          const li = document.createElement("li")
          li.innerText = `${pokemon.nickname} (${pokemon.species})`
          const releaseBtn = document.createElement("button")
          releaseBtn.innerText = "Release"
          releaseBtn.className = "release"
          releaseBtn.dataset.id = pokemon.id
          
          releaseBtn.addEventListener("click", releasePokemon)
          li.append(releaseBtn)
          ul.append(li)

        }

      function releasePokemon(e) {
        console.log(e.target.parentElement)
        fetch(`http://localhost:3000/pokemons/${e.target.dataset.id}`, {
          method: "DELETE"
        })
        e.target.parentElement.remove()
      }

      






})
