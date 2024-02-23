class ToolsController < ApplicationController
  def saponification
    @ingredients = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
  end
end
