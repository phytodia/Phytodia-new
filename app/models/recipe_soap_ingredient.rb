class RecipeSoapIngredient < ApplicationRecord
  belongs_to :ingredient
  belongs_to :recipe_soap
end
