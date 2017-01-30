class User < ApplicationRecord
  validates_uniqueness_of :email, scope: :fb_id
  has_many :comments
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

  def self.get_FB_profile(code)
    @oauth = Koala::Facebook::OAuth.new(Rails.application.secrets.fb_client_id, Rails.application.secrets.fb_secret_key, "http://ruby-pg-env.vnmyh7yq7h.us-east-1.elasticbeanstalk.com/")
    oauthtoken = @oauth.get_access_token(code)
    @graph = Koala::Facebook::API.new(oauthtoken)
    @graph.get_object("me")
  end
end
