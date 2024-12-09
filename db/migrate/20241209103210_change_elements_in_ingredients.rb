class ChangeElementsInIngredients < ActiveRecord::Migration[7.0]
  def change
    rename_column :ingredients, :Linoeic, :Linoleic
  end
end
