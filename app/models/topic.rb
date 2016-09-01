class Topic < ApplicationRecord
	has_many :interests
  has_many :users, through: :interests
  has_many :posts
  validates_uniqueness_of :user_id, scope: :topic_id
end
