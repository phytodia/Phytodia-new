class ToolsController < ApplicationController
  def saponification
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    @json = @ingredients.to_json

    #data = Applicant.includes(:job).group('status').count
    #@labels = ["Test1","Test2"]
    #@series = [5,10]
  end
end
