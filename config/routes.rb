Rails.application.routes.draw do
  root 'application#angular'
  resources :users
  resources :topics, only: [:index, :show]
end
