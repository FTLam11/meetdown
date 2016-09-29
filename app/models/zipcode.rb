class Zipcode < ApplicationRecord
  def neighbors
    Neighbor.where(["zipcode_1 = ? or zipcode_2 = ?", self.zipcode, self.zipcode]).map {|zipcode_pair| zipcode_pair = [zipcode_pair.zipcode_1, zipcode_pair.zipcode_2]}.flatten.select {|zipcode| zipcode != self.zipcode}
  end
end
