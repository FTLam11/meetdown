class Event < ApplicationRecord
	has_many :attendings
	has_many :comments
	has_many :users, through: :attendees
	has_many :hostings
	has_many :themes
	has_many :users, through: :hosts
	has_many :topics, through: :themes
	has_many :hosts, through: :hostings, source: :user
	has_many :attendees, through: :attendings, source: :user
	has_many :venues
	has_many :zipcodes, through: :venues
end
