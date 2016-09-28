class Neighbor < ApplicationRecord
  has_many :zipcodes
  validates_uniqueness_of :zipcode_1, scope: :zipcode_2
end
