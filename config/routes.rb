Lime::Application.routes.draw do

  # Route for main app, accessed by logged in users
  get "app", to: 'static_pages#app'

  devise_for :users do
    root to: 'static_pages#home'
  end

  # List routes
  resources :lists, except: [:show, :new, :edit] do
    resources :tasks, only: [:create]
    resources :tasks, only: [:create]
  end

  # Task routes
  resources :tasks, only: [:index, :update, :destroy]
  resources :tasks, only: [:index, :update, :destroy]

  # Tags
  resources :tags, only: [:index, :create, :update, :destroy]

end
