class ChangeLinolenic < ActiveRecord::Migration[7.0]
  def change
    rename_column :ingredients, :linoleic, :Linoeic
  end
end
