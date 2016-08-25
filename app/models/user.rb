class User < ApplicationRecord
  # has_secure_password
  has_many :interests
  has_many :topics, through: :interests

  def self.parse_json(obj)
    p obj
  end
end
