class TrainersController < ApplicationController
  def index
    render json: Trainer.all, include: :pokemon
  end
  
  def show
    render json: Trainer.find_by(id: params[:id])
  end

  def generate_pokemon
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id]
    )
    render json: pokemon
  end
end
