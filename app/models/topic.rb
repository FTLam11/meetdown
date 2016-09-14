class Topic < ApplicationRecord
  has_many :interests
  has_many :users, through: :interests
  has_many :posts
  has_many :themes
  has_many :events, through: :themes
  validate :five_chars

  def five_chars
  	errors.add(:verbs, "is not 5 chars") unless verbs.length == 7
  end
end
