class RecipeSoap < ApplicationRecord
  has_many :recipe_soap_ingredients
  has_many :ingredients, through: :recipe_soap_ingredients

  validates :hardness, presence: true
  validates :cleansing, presence: true
  validates :condition, presence: true
  validates :bubbly, presence: true
  validates :creamy, presence: true
  validates :iodine, presence: true

  validates :qty_water, presence: true
  validates :surgraissage_taux, presence: true
  validates :type_soude, presence: true
  validates :qty_soude, presence: true
end
