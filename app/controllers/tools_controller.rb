class ToolsController < ApplicationController
  before_action :set_params_savon

  def saponification
    @datas = []
    @series.each do |serie|
      @datas << {name: "Recette #{(@series.index serie)+1}",data:serie}
    end
    @donnees = []
    @faqs = Faq.all

    @new_recipe = RecipeSoap.new

    @recipes = RecipeSoap.all

    @ingredients = @ingredients.sort_by { |key, value| value["French_name"] }.to_h
  end

  def new_recipe_partial
    render partial: "recipe"
  end

  def save_recipe_soap
    if JSON.parse(params[:recipe_soap][:ingredients]).empty?
      redirect_to tools_saponification_path()
    else
      ingredients_list = Ingredient.pluck(:english_name,:id).each {|arr| arr[0].downcase}
      ingredients_list = Hash[ingredients_list].transform_keys(&:downcase)

      @recipe_soap = RecipeSoap.new(soap_params)
      if @recipe_soap.type_soude == "KOH"
        @recipe_soap.surgraissage_taux = 0
      end
      @recipe_soap.save

      ingredients = params[:recipe_soap][:ingredients]
      ingredients.each do |ing|
        ing_recipe = RecipeSoapIngredient.new(name_ing:ing["name_ing"],qty:ing["qty"].to_f,recipe_soap_id:@recipe_soap.id,ingredient_id:ingredients_list[ing["name_ing"].downcase])
        ing_recipe.save
      end

      redirect_to tools_saponification_path()
    end


    #@recipe_soap.ingredients = params[:recipe_soap][:ingredients]

  end

  def counter
    @recipe_soap = RecipeSoap.find(params[:recipe].to_i)
    if params[:arrow] == "up"
      @recipe_soap.counter = @recipe_soap.counter += 1
    elsif params[:arrow] == "down"
      @recipe_soap.counter = @recipe_soap.counter -= 1
    end
    @recipe_soap.save
  end

  def sort_ingredients_table
    #@ingredients_table

    #User.order('name DESC')
    # .order not working -> utiliser .reorder
    # SELECT "users".* FROM "users" ORDER BY name DESC
    element_to_sort = params[:name]

    sort_type = params[:sort] #asc or desc
    #fail
    #Ingredient
    #sort_type
    case element_to_sort
    when "ingredient"
      @ingredients_table = @ingredients_table.reorder("french_name #{sort_type}")
    when "INCI"
      @ingredients_table = @ingredients_table.reorder(INCI_name: sort_type.to_sym)
    when "durete"
      @ingredients_table = @ingredients_table.reorder(hardness: sort_type.to_sym)
    when "pouvoir lavant"
      @ingredients_table = @ingredients_table.reorder(cleansing: sort_type.to_sym)
    when "condition"
      @ingredients_table = @ingredients_table.reorder(condition: sort_type.to_sym)
    when "bulles"
      @ingredients_table = @ingredients_table.reorder(bubbly: sort_type.to_sym)
    when "creamy"
      @ingredients_table = @ingredients_table.reorder(creamy: sort_type.to_sym)
    when "iodine"
      @ingredients_table = @ingredients_table.reorder(iodine: sort_type.to_sym)
    when "INS"
      @ingredients_table = @ingredients_table.reorder(INS: sort_type.to_sym)
    when "Lauric"
      @ingredients_table = @ingredients_table.reorder(lauric: sort_type.to_sym)
    when "Myristic"
      @ingredients_table = @ingredients_table.reorder(myristic: sort_type.to_sym)
    when "Palmitic"
      @ingredients_table = @ingredients_table.reorder(palmitic: sort_type.to_sym)
    when "Stearic"
      @ingredients_table = @ingredients_table.reorder(stearic: sort_type.to_sym)
    when "Ricinoleic"
      @ingredients_table = @ingredients_table.reorder(ricinoleic: sort_type.to_sym)
    when "Oleic"
      @ingredients_table = @ingredients_table.reorder(oleic: sort_type.to_sym)
    when "Linoleic"
      @ingredients_table = @ingredients_table.reorder(Linoleic: sort_type.to_sym)
    when "Linolenic"
      @ingredients_table = @ingredients_table.reorder(linolenic: sort_type.to_sym)
    when "NaOH"
      @ingredients_table = @ingredients_table.reorder(NaOH_SAP: sort_type.to_sym)
    when "KOH"
      @ingredients_table = @ingredients_table.reorder(KOH_SAP: sort_type.to_sym)
    when "vitesse"
      @ingredients_table = @ingredients_table.reorder(vitesse_tracage: sort_type.to_sym)
    else

    end

    respond_to do |format|
      format.turbo_stream do
        #Ajouter locals: @ingredients_table
        render turbo_stream: turbo_stream.replace(:ingredients_table, partial:"tools/tableau_ingredients")
      end
    end
    #redirect_to tools_saponification_path
  end
  private
  def set_params_savon
    @ingredients2 = YAML.load_file("#{Rails.root.to_s}/db/data/saponification.yml")
    @hash_ingredients = {}
    Ingredient.all.each do |ingredient|
      #ingredient.attributes.keys.map! { |key| key.capitalize }
      x = {ingredient.attributes["english_name"].capitalize => ingredient.attributes}
      #x[x.keys.first].transform_keys{ |key| key.to_s.capitalize }
      x[x.keys.first] = x[x.keys.first].transform_keys{ |key| key.to_s.capitalize }
      x[x.keys.first]["INS"] = x[x.keys.first]["Ins"]
      x[x.keys.first]["NaOH SAP"] = x[x.keys.first]["Naoh_sap"]
      x[x.keys.first]["KOH SAP"] = x[x.keys.first]["Koh_sap"]
      #return x
      @hash_ingredients.merge!(x)
    end
    # mettre en majuscule chaque clé et retirer l'id du hash.
    @ingredients = @hash_ingredients
    @json = @ingredients.to_json
    @json2 = @ingredients2.to_json

    @savon_proprietes = {
      Hardness:0,
      Cleansing:0,
      Condition:0,
      Bubbly:0,
      Creamy:0,
      Iodine:0,
      INS:0,
      Lauric:0,
      Myristic:0,
      Palmitic:0,
      Stearic:0,
      Ricinoleic:0,
      Oleic:0,
      Linoleic:0,
      Linolenic:0,
      Vitesse_tracage:0
    }
    @savon_proprietes = @savon_proprietes.to_json
    @labels = ["Recette α"]
    @series = [[0, 0, 0, 0, 0, 0]]

    @ingredients_table = Ingredient.all.order("french_name asc")
  end

  def soap_params
    params[:recipe_soap][:ingredients] = JSON.parse(params[:recipe_soap][:ingredients]).map {|element| JSON.parse(element)}
    params.require(:recipe_soap).permit(:titre,:qty_water,:qty_soude,:type_soude,:surgraissage_taux,:hardness,:cleansing,:condition,:bubbly,:creamy,:iodine,ingredients:[])
  end
end
