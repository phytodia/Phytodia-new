Rails.application.routes.draw do
  root "pages#home"

  get 'tools/saponification'
  post 'full_list', to: "tools#full_list"
  get '/new_recipe_partial', to: "tools#new_recipe_partial"
  get 'pages/home'
  get 'pages/contact'
  get 'pages/about'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
