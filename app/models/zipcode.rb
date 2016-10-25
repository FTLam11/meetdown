class Zipcode < ApplicationRecord
  has_many :venues
  has_many :events, through: :venues
  has_many :proximities, through: :neighbors, source: :zipcode

  def neighbors
    neighbors = Neighbor.where(["zipcode_1 = ? or zipcode_2 = ?", self.zipcode, self.zipcode])
    neighboring_zipcodes = neighbors.map do |neighbor|
      if neighbor.zipcode_2 == self.zipcode
        neighbor = Zipcode.find_by(zipcode: neighbor.zipcode_1) 
      else
        neighbor = Zipcode.find_by(zipcode: neighbor.zipcode_2)
      end
    end
    neighboring_zipcodes << self
  end

  def eventsNearby
    events = []
    self.neighbors.each do |neighbor|
      neighbor.events.each do |event|
        events << event
      end
    end
    events.uniq
  end
end
