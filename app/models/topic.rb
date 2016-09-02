class Topic < ApplicationRecord
  has_many :interests
  has_many :users, through: :interests
  has_many :posts
  has_many :actions
  has_many :verbs, through: :actions
end
