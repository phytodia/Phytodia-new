class ToolsController < ApplicationController
  def saponification
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    @json = @ingredients.to_json
    @labels = ["Recette 1","Recette 2"]
    @series = [[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0]]
    #data = Applicant.includes(:job).group('status').count
    #@labels = ["Test1","Test2"]
    #@series = [5,10]
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

    @datas = []
    @series.each do |serie|
      @datas << {name: "Recette #{(@series.index serie)+1}",data:serie}
    end
  end

  def new_recipe_partial
    #@ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    render partial: "recipe"
  end

  def full_list
  end
end
