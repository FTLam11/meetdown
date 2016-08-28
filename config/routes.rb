Rails.application.routes.draw do
  devise_for :users
  root 'application#angular'
  get '/users/fb', to: "users#create"
  resources :topics, only: [:index, :show]
end
