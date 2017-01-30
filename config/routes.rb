Rails.application.routes.draw do
  post "/users/s3", to: "users#s3_access_token"

  post "/events/:id/user/:user_id/comments", to: "events#postComment"
  put "/events/:id", to: "events#update"
  get "/events/:id", to: "events#show"
  post "/events/create", to: "events#create"

  delete "/comments/:id", to: "events#deleteComment"
  get "/events/:id/comments", to: "events#showComments"
  get "/events/userEventList", to: "events#userEventList"
  
  put "/users/:id", to: "users#update"
  get "/users/:id/topics", to: "users#user_topics"
  get "/users/:id", to: "users#show"
  
  get "/zip_code/:zip_code/topics", to: "topics#zipTopics"
  get "/zip_code/:id", to: "topics#zipCount"
  
  get "/events/:id/attendees", to: "events#showAttendees"
  get "/events/:id/hosts", to: "events#showHosts"
  post "/events/createAttend", to: "events#createAttend"
  
  get "/auth/facebook", to: "users#fbcreate"
  post "/auth/signup", to: "users#create"
  post "/auth/login", to: "users#new_session"
  
  post "/topics/suggest", to: "topics#suggest"
  
  post "/users/fb", to: "users#fbcreate"
  delete "/events/cancelAttend", to: "events#cancelAttend"
  
  post "/interesteezy", to: "interests#destroy"
  post "/interests", to: "interests#create"
  resources :actions, only: [:create]
  resources :topics, only: [:index]
  root "application#angular"
end
