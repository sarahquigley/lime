Lime::Application.routes.draw do

  # Route for main app, accessed by logged in users
  get "app", to: 'static_pages#app'

  devise_for :users do
    root to: 'static_pages#home'
  end

  # List routes
  resources :lists, except: [:show, :new, :edit]

  # Task routes
  resources :tasks, only: [:create, :update, :destroy]

end
