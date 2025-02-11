Rails.application.routes.draw do
  root "pages#home"

  get 'tools/saponification'
  get '/new_recipe_partial', to: "tools#new_recipe_partial"
  get 'pages/home'
  get 'pages/contact'
  get 'pages/about'

  #resources :recipe_soaps, only: [:new, :create]

  get 'sort/:name/:sort',to:"tools#sort_ingredients_table",as: :ingredient_sort
  post 'save_recipe', to: "tools#save_recipe_soap"
  get "counter", to: "tools#counter"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
