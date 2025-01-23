class AddVitesseTracage < ActiveRecord::Migration[7.0]
  def change
    add_column :ingredients, :vitesse_tracage, :float
  end
end
