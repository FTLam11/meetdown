class Zipcode < ApplicationRecord
  def neighbors
    Neighbor.where(["zipcode_1 = ? or zipcode_2 = ?", self.zipcode, self.zipcode])
  end
end
