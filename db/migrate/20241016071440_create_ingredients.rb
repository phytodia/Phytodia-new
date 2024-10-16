class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.string :french_name
      t.string :latin_name
      t.string :english_nale
      t.string :INCI_name
      t.integer :IS
      t.string :durete
      t.string :pouvoir_lavant
      t.string :douceur
      t.string :bulles
      t.string :cremeux
      t.integer :iode
      t.integer :INS
      t.integer :lauric
      t.integer :mystiric
      t.integer :palmitic
      t.integer :stearic
      t.integer :ricinoleic
      t.integer :oleic
      t.integer :linoleic
      t.integer :linolenic

      t.timestamps
    end
  end
end
