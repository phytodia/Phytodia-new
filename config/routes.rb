Rails.application.routes.draw do
  root "pages#home"

  get 'tools/saponification'
  get '/new_recipe_partial', to: "tools#new_recipe_partial"
  get 'pages/home'
  get 'pages/contact'
  get 'pages/about'

  get 'sort/:name/:sort',to:"tools#sort_ingredients_table",as: :ingredient_sort
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
