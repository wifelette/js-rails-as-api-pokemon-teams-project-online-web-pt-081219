class PokemonsController < ApplicationController
  def index
    render json: Pokemon.all
  end
  
  def show
    render json: Pokemon.find_by(id: params[:id])
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    # Return a 200
    head :ok
  end
end
