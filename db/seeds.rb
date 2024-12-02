# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Ingredient.create(
  french_name:"Beurre d'aloe vera",latin_name:"",english_name:"Aloe Butter",INCI_name:"",IS:"",
  INS:241,hardness:74,lauric:45,palmitic:8,stearic:3,
  ricinoleic:0,oleic:7,
  Linoeic:2,linolenic:0,NaOH_SAP:0.171,KOH_SAP:0.24,bubbly:63,creamy:11,
  iodine:9,myristic:18,cleansing:63,condition:9
)

Ingredient.create(
  french_name:"Huile d'amande douce",latin_name:"",english_name:"Almond Oil sweet",INCI_name:"",IS:"",INS:97,
  hardness:7,lauric:0,palmitic:7,stearic:0,ricinoleic:0,oleic:71,
  Linoeic:18,linolenic:0,NaOH_SAP:0.139,KOH_SAP:0.195,bubbly:0,creamy:7,
  iodine:99,myristic:0,cleansing:0,condition:89
)
