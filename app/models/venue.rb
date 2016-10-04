class Venue < ApplicationRecord
	belongs_to :event
	belongs_to :zipcode
end
