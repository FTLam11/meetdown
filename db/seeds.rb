Topic.create(name: "Pokemon", verbs:"1100110")
Topic.create(name: "Magic: The Gathering", verbs:"1000110")
Topic.create(name: "Dota 2", verbs:"1101000")
Topic.create(name: "Dominion Online", verbs:"0100110")
Topic.create(name: "Chicago Cubs", verbs:"0000110")
Topic.create(name: "Jasmine Tea", verbs:"1110000")
Topic.create(name: "Eevee", verbs:"0000111")
Topic.create(name: "BBQ Bacon Cheeseburger", verbs:"1010110")
Topic.create(name: "Grapefruit", verbs:"0100110")
Topic.create(name: "Sky Diving", verbs:"1111111")

User.create(email: "",fb_id: "2")

require 'rubygems'
require 'json'

file = open("#{Rails.root}/db/zipcodes.json")
json = file.read

parsed = JSON.parse(json)

def removeCenter(json)
	if json["geometry"]["coordinates"][0][0][0]
		json["geometry"]["coordinates"][0].shift
	end
	return json
end

parsed["features"].each do |json|
  Zipcode.create(zipcode: json["id"], center:json["geometry"]["coordinates"][0][0],  geojson: removeCenter(json))
end

zipcodes = Zipcode.all
RAD = Math::PI/180
RKM = 6371                  # Earth radius in kilometers

def distance(loc1, loc2)
  loc1 = loc1[1..-2].split(",").map(&:to_f) #turn string into array
  loc2 = loc2[1..-2].split(",").map(&:to_f)

  dlat_rad = (loc2[0]-loc1[0]) * RAD  # Delta, converted to rad
  dlon_rad = (loc2[1]-loc1[1]) * RAD

  lat1_rad, lon1_rad = loc1.map {|i| i * RAD }
  lat2_rad, lon2_rad = loc2.map {|i| i * RAD }

  a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
  c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

  RKM * c # Delta in km
end

zipcodes.each_with_index do |zipcode, index|
  while index < zipcodes.length - 1
    displacement = distance(zipcode.center, zipcodes[index + 1].center)
    Neighbor.create(zipcode_1: zipcode.zipcode, zipcode_2: zipcodes[index + 1].zipcode, distance: displacement) if displacement <= 32.0
    index += 1
  end
end