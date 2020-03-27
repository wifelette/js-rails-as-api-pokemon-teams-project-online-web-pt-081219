const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const MAIN = document.querySelector("main");

// Async function just means... FIRST the stuff you'll "await" needs to happen, and then everything else in the function can happen.
async function main() {
  let response = await fetch(TRAINERS_URL);
  let data = await response.json();

  for (let trainer of data) {
    MAIN.appendChild(createTrainer(trainer));
  }
}

function createTrainer(trainer) {
  let cardHTML = `
    <div class="card">
      <p>${trainer.name}</p>
      <button>Add Pokemon</button>
      <ul>

      </ul>
    </div>
  `;

  let card = template(cardHTML);

  let ul = card.querySelector("ul");

  for (let pokemon of trainer.pokemon) {
    ul.appendChild(createPokemon(pokemon));
  }
  card.querySelector("button").addEventListener("click", async () => {
    let response = await fetch(
      `${TRAINERS_URL}/${trainer.id}/generate_pokemon`,
      {
        method: "POST"
      }
    );
    let pokemon = await response.json();

    ul.appendChild(createPokemon(pokemon));
  });

  return card;
}

function createPokemon(pokemon) {
  let contents = template(
    `
    <li>
      ${pokemon.nickname} (${pokemon.species})
      <button class="release">Release</button>
    </li>
    `
  );

  let li = contents.querySelector("li");

  contents.querySelector(".release").addEventListener("click", async () => {
    await fetch(`${POKEMONS_URL}/${pokemon.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    li.remove();
  });

  return contents;
}

function template(string) {
  // Think of the Template like the word's dictionary meaning
  let template = document.createElement("template");
  template.innerHTML = string;
  return template.content;
}

main();
