Rails.application.routes.draw do
  put '/users/:id', to: "users#update"
  get '/users/:id', to: "users#show"
  get '/users/:id/topics', to: "users#user_topics"
  get '/zip_code/:id', to: "topics#zipCount"
  devise_for :users
  post '/users/fb', to: "users#create"
  # post '/users/:user_id/topics/:topic_id', to: "users#addInterest"
  resources :interests, only: [:create]
  resources :actions, only: [:create]
  root 'application#angular'
  resources :topics, only: [:index, :show]
end
