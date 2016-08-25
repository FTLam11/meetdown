class Topic < ApplicationRecord
  has_many :interests
  has_many :users, through: :interests
  has_many :posts
end
