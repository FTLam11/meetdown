class Zipcode < ApplicationRecord
  has_many :venues
  has_many :events, through: :venues
  has_many :proximities, through: :neighbors, source: :zipcode

  def neighbors
    neighbors = Neighbor.where(["zipcode_1 = ? or zipcode_2 = ?", self.zipcode, self.zipcode])
    zipcodes = []
    zipcodes << self
    neighbors.each do |neighbor|
      zipcodes << Zipcode.find_by(zipcode: neighbor.zipcode_1) if neighbor.zipcode_2 == self.zipcode
      zipcodes << Zipcode.find_by(zipcode: neighbor.zipcode_2) if neighbor.zipcode_1 == self.zipcode
    end
    zipcodes.uniq
  end

  def eventsNearby
    events = []
    self.neighbors.each do |neighbor|
      neighbor.events.each do |event|
        events << event
        p event
      end
    end
    events.uniq
  end
end
