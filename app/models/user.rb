class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,:lockable
  validates_uniqueness_of :email, scope: :fb_id
  has_many :interests
  has_many :topics, through: :interests
end
