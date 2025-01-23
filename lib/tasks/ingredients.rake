namespace :ingredients do
  desc "TODO"
  task ingredient_import: :environment do
    require "csv"
    filepath = "db/data/export_ingredients.csv"
    Ingredient.destroy_all

    CSV.foreach((filepath), headers: true, encoding:'iso-8859-1:utf-8', col_sep: ";") do |row|
      puts "nouvel ingrédient"
      Ingredient.create!(french_name:row[0],latin_name:row[1],english_name:row[2],INCI_name:row[3],IS:row[4].to_i,hardness:row[5].to_i,INS:row[6].to_i,lauric:row[7].to_i,palmitic:row[8].to_i,stearic:row[9].to_i,ricinoleic:row[10].to_i,oleic:row[11].to_i,Linoleic:row[12].to_i,linolenic:row[13].to_i,NaOH_SAP:row[14].to_f,KOH_SAP:row[15].to_f,bubbly:row[16].to_i,creamy:row[17].to_i,iodine:row[18].to_i,myristic:row[19].to_i,cleansing:row[20].to_i,condition:row[21].to_i)
    end
  end

end
