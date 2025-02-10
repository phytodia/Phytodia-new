class CreateRecipeSoaps < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_soaps do |t|
      t.string :titre
      t.float :qty_water
      t.float :surgraissage_taux
      t.string :type_soude

      t.timestamps
    end
  end
end
