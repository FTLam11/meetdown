class User < ApplicationRecord
  validates_uniqueness_of :email, scope: :fb_id
  has_many :interests
  has_many :topics, through: :interests
  has_many :hostings
  has_many :attendings
  has_many :hosted_events, through: :hostings, source: :event
  has_many :attended_events, through: :attendings, source: :event

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest) == password
  end
end
