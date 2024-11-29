# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_11_29_082943) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingredients", force: :cascade do |t|
    t.string "french_name"
    t.string "latin_name"
    t.string "english_name"
    t.string "INCI_name"
    t.integer "IS"
    t.string "hardness"
    t.integer "INS"
    t.integer "lauric"
    t.integer "palmitic"
    t.integer "stearic"
    t.integer "ricinoleic"
    t.integer "oleic"
    t.integer "linoleic"
    t.integer "linolenic"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "NaOH_SAP"
    t.float "KOH_SAP"
    t.integer "bubbly"
    t.integer "creamy"
    t.integer "iodine"
    t.integer "myristic"
    t.integer "cleansing"
    t.integer "condition"
  end

end
