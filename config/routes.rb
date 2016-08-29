Rails.application.routes.draw do
  devise_for :users
  post '/users/fb', to: "users#create"
  post '/users/:user_id/topics/:topic_id', to: "users#addInterest"
  root 'application#angular'
  resources :topics, only: [:index, :show]
end
