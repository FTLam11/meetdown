class Topic < ApplicationRecord
  has_many :interests
  has_many :users, through: :interests
  has_many :posts
  has_many :themes
  has_many :events, through: :themes

  def self.getAll
    Topic.select('topics.*, count(interests.id) as interest_count')
        .joins('left outer join interests on interests.topic_id = topics.id')
        .group('topics.id')
        .order('interest_count DESC')
  end
end
