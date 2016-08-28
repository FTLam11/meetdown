Rails.application.routes.draw do
  devise_for :users
  root 'application#angular'
  resources :users
  resources :topics, only: [:index, :show]
end
