zipcodes = Zipcode.all
length = Zipcode.all.count
# 32.0 meter radius
# zipcodes.each do |first_zipcode|
#   zipcodes.each do |second_zipcode|
#     next if first_zipcode == second_zipcode
#     displacement = distance(first_zipcode, second_zipcode)
#     Neighbor.create(zipcode_1: first_zipcode, zipcode_2: second_zipcode, distance: displacement) if displacement <= 32.0
#   end
# end

def distance(loc1, loc2)
  rad_per_deg = Math::PI/180  # PI / 180
  rkm = 6371                  # Earth radius in kilometers
  rm = rkm * 1000             # Radius in meters

  dlat_rad = (loc2[0]-loc1[0]) * rad_per_deg  # Delta, converted to rad
  dlon_rad = (loc2[1]-loc1[1]) * rad_per_deg

  lat1_rad, lon1_rad = loc1.map {|i| i * rad_per_deg }
  lat2_rad, lon2_rad = loc2.map {|i| i * rad_per_deg }

  a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
  c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

  rm * c # Delta in meters
end

zipcodes.each_with_index do |zipcode, index|
  while index < length
    displacement = distance(zipcode, zipcodes[index + 1])
    Neighbor.create(zipcode_1: first_zipcode, zipcode_2: second_zipcode, distance: displacement) if displacement <= 32.0
    index += 1
  end
end