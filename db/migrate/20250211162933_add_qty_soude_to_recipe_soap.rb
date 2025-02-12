class AddQtySoudeToRecipeSoap < ActiveRecord::Migration[7.0]
  def change
    add_column :recipe_soaps, :qty_soude, :float, default:0
    add_column :recipe_soaps, :counter, :integer, default:0
    add_column :recipe_soaps, :hardness, :integer, default:0
    add_column :recipe_soaps, :cleansing, :integer, default:0
    add_column :recipe_soaps, :condition, :integer, default:0
    add_column :recipe_soaps, :bubbly, :integer, default:0
    add_column :recipe_soaps, :creamy, :integer, default:0
    add_column :recipe_soaps, :iodine, :integer, default:0
    add_column :recipe_soaps, :surgraissage, :float, default:0
  end
end
