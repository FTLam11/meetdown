class Zipcode < ApplicationRecord
  has_many :venues
  has_many :events, through: :venues
  has_many :proximities, through: :neighbors, source: :zipcode

  def neighbors
    neighbors = Neighbor.where(["zipcode_1 = ? or zipcode_2 = ?", self.zipcode, self.zipcode])
    neighboring_zipcodes = neighbors.map do |neighbor|
      neighbor = Zipcode.find_by(zipcode: neighbor.zipcode_1) if neighbor.zipcode_2 == self.zipcode
      neighbor = Zipcode.find_by(zipcode: neighbor.zipcode_2) if neighbor.zipcode_1 == self.zipcode
    end
    neighboring_zipcodes << self
  end

  def eventsNearby
    events = self.neighbors.map { |neighbor| neighbor = neighbor.events }
    events.uniq
  end
end
