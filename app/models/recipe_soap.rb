class RecipeSoap < ApplicationRecord
  has_many :recipe_soap_ingredients
  has_many :ingredients, through: :recipe_soap_ingredients
end
