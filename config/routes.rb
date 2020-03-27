Rails.application.routes.draw do
  resources :pokemons
  resources :trainers do
    post :generate_pokemon
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
