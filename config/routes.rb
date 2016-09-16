Rails.application.routes.draw do
  put '/users/:id', to: "users#update"
  get '/users/:id/topics', to: "users#user_topics"
  get '/users/:id', to: "users#show"
  get '/zip_code/:zip_code/topics', to: "topics#zipTopics"
  get '/zip_code/:id', to: "topics#zipCount"
  get '/auth/facebook', to: "users#fbcreate"
  post '/topics/suggest', to: "topics#suggest"
  post '/event/create', to: "event#create"
  devise_for :users
  post '/users/fb', to: "users#fbcreate"
  # post '/users/:user_id/topics/:topic_id', to: "users#addInterest"
  resources :interests, only: [:create]
  resources :actions, only: [:create]
  root 'application#angular'
  resources :topics, only: [:index, :show]
end
