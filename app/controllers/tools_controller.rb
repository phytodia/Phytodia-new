class ToolsController < ApplicationController
  def saponification
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    @json = @ingredients.to_json
    @labels = ["abc","def","ghi","jkl","mno"]
    @series = [50, 50, 50, 50, 50, 20]
    #data = Applicant.includes(:job).group('status').count
    #@labels = ["Test1","Test2"]
    #@series = [5,10]
  end
end
