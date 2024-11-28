class ToolsController < ApplicationController
  before_action :set_params_savon

  def saponification
    @datas = []
    @series.each do |serie|
      @datas << {name: "Recette #{(@series.index serie)+1}",data:serie}
    end
  end

  def new_recipe_partial
    render partial: "recipe"
  end

  def full_list
  end

  def set_params_savon
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    h3 = {Ingredient.last.attributes["english_name"].capitalize => Ingredient.last.attributes }
    # mettre en majuscule chaque clé et retirer l'id du hash.
    fail
    @json = @ingredients.to_json

    @savon_proprietes = {
      Hardness:0,
      Cleansing:0,
      Condition:0,
      Bubbly:0,
      Creamy:0,
      Iodine:0,
      INS:0
    }
    @savon_proprietes = @savon_proprietes.to_json
    @labels = ["Recette 1"]
    @series = [[0, 0, 0, 0, 0, 0]]
  end
end
