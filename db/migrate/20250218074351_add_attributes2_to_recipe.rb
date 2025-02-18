class AddAttributes2ToRecipe < ActiveRecord::Migration[7.0]
  def change
    remove_column :recipe_soaps, :hardness, :integer, default:0
  end
end
