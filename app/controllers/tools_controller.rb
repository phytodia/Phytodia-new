class ToolsController < ApplicationController
  def saponification
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    @json = @ingredients.to_json
    @labels = ["Recette 1","Recette 2"]
    @series = [[20, 50, 60, 50, 10, 50],[20, 40, 40, 100, 70, 10]]
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
end
