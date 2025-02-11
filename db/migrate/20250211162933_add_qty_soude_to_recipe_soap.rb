class AddQtySoudeToRecipeSoap < ActiveRecord::Migration[7.0]
  def change
    add_column :recipe_soaps, :qty_soude, :float
  end
end
