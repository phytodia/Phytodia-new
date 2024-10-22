class ToolsController < ApplicationController
  def saponification
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    @json = @ingredients.to_json
    @labels = ["abc","def","ghi","jkl","mno"]
    @series = [50, 50, 50, 50, 50, 20]
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
  end
end
