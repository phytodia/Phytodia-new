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
      hardness:0,
      cleansing:0,
      condition:0,
      bubbly:0,
      creamy:0,
      iodine:0,
      ins:0,
      lauric:0,
      myristic:0,
      palmitic:0,
      stearic:0,
      ricinoleic:0,
      oleic:0,
      linoeic:0,
      inoleic:0
    }
    @savon_proprietes = @savon_proprietes.to_json
  end
end
