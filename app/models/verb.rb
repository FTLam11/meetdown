class Verb < ApplicationRecord
  has_many :actions
  has_many :topics, through: :actions
end
