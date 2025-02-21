class Ingredient < ApplicationRecord
  has_many :recipe_soap_ingredients,dependent: :destroy
  has_many :recipe_soaps, through: :recipe_soap_ingredients
end
