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

parsed["features"].each do |json|
  Zipcode.create(zipcode: json["id"], geojson: json)
end