class Zipcode < ApplicationRecord
	has_many :neighbors
	has_many :proximities, through: :neighbors, source: :zipcode

end
