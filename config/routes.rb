Lime::Application.routes.draw do
  get "app", to: 'static_pages#app'

  devise_for :users do
    root to: 'static_pages#home'
  end

end
