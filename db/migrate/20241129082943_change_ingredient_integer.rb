class ChangeIngredientInteger < ActiveRecord::Migration[7.0]
  def change
    remove_column :ingredients, :bubbly
    remove_column :ingredients, :creamy
    remove_column :ingredients, :iodine
    remove_column :ingredients, :myristic
    remove_column :ingredients, :cleansing
    remove_column :ingredients, :condition

    add_column :ingredients, :bubbly, :integer
    add_column :ingredients, :creamy, :integer
    add_column :ingredients, :iodine, :integer
    add_column :ingredients, :myristic, :integer
    add_column :ingredients, :cleansing, :integer
    add_column :ingredients, :condition, :integer
    dd_column :ingredients, :condition, :integer
  end
end
