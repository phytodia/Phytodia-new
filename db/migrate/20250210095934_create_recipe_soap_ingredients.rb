class CreateRecipeSoapIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_soap_ingredients do |t|
      t.references :ingredient, null: false, foreign_key: true
      t.references :recipe_soap, null: false, foreign_key: true
      t.string :name_ing
      t.float :qty

      t.timestamps
    end
  end
end
