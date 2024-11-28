class ChangeIngredientNames < ActiveRecord::Migration[7.0]
  def change
    rename_column :ingredients, :durete, :hardness
    rename_column :ingredients, :pouvoir_lavant, :cleansing
    rename_column :ingredients, :douceur, :condition
    rename_column :ingredients, :bulles, :bubbly
    rename_column :ingredients, :cremeux, :creamy
    rename_column :ingredients, :iode, :iodine
    rename_column :ingredients, :mystiric, :myristic
    rename_column :ingredients, :english_nale, :english_name

    add_column :ingredients, :NaOH_SAP, :float
    add_column :ingredients, :KOH_SAP, :float
  end
end
