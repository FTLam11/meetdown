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
RKM = 6371

def distance(loc1, loc2)
  loc1 = loc1[1..-2].split(",").map(&:to_f) #turn string into array
  loc2 = loc2[1..-2].split(",").map(&:to_f)

  dlat_rad = (loc2[0]-loc1[0]) * RAD
  dlon_rad = (loc2[1]-loc1[1]) * RAD

  lat1_rad, lon1_rad = loc1.map {|i| i * RAD }
  lat2_rad, lon2_rad = loc2.map {|i| i * RAD }

  a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
  c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

  RKM * c
end

zipcodes.each_with_index do |zipcode, index|
  1200.times do
    displacement = distance(zipcode.center, zipcodes[index + 1].center)
    Neighbor.create(zipcode_1: zipcode.zipcode, zipcode_2: zipcodes[index + 1].zipcode, distance: displacement) if displacement <= 24
    index += 1
  end
end

Topic.create(name:"Group Workouts", verbs:'0010100001')
Topic.create(name:"Runners", verbs:'1010000001')
Topic.create(name:"Dog Play Dates", verbs:'0000000001')
Topic.create(name:"Social Work", verbs:'0100000000')
Topic.create(name:"General Networking Events", verbs:'0100000000')
Topic.create(name:"Accountability Partners", verbs:'0000000001')
Topic.create(name:"Social Coding", verbs:'0100100001')
Topic.create(name:"Study Halls", verbs:'0000000001')
Topic.create(name:"Writing Workshops", verbs:'0000100001')
Topic.create(name:"Drinking Games", verbs:'0001000001')
Topic.create(name:"Workout Partners", verbs:'0010000001')
Topic.create(name:"League Sports", verbs:'0010000001')
Topic.create(name:"Bowling", verbs:'0010000000')
Topic.create(name:"Marathon Training", verbs:'0010000001')
Topic.create(name:"Ultimate Frisbee", verbs:'0010000001')
Topic.create(name:"Softball", verbs:'0010000001')
Topic.create(name:"Strength & Conditioning", verbs:'0010000001')
Topic.create(name:"Co-ed Kickball", verbs:'0010000001')
Topic.create(name:"Co-ed Adult Dodgeball", verbs:'0010000001')
Topic.create(name:"Pick-up Basketball", verbs:'0010000001')
Topic.create(name:"Baseball", verbs:'0010000001')
Topic.create(name:"Hockey", verbs:'0010000001')
Topic.create(name:"Fantasy Sports Leagues", verbs:'0010000001')
Topic.create(name:"NHL", verbs:'0000001000')
Topic.create(name:"Writers", verbs:'1100000001')
Topic.create(name:"Hack Nights", verbs:'0100000001')
Topic.create(name:"Asexual", verbs:'1000000000')
Topic.create(name:"Coping with Loss", verbs:'1000000000')
Topic.create(name:"People that are Kinky - Fetishes & BDSM", verbs:'1000000001')
Topic.create(name:"Travel Group", verbs:'0000000001')
Topic.create(name:"Weight Loss Partners", verbs:'0000000001')
Topic.create(name:"Recreational Sports Leagues", verbs:'0000000001')
Topic.create(name:"Pub Trivia", verbs:'0000000011')
Topic.create(name:"Meet for Lunches", verbs:'0000000011')
Topic.create(name:"Pair Programming", verbs:'0000000001')
Topic.create(name:"Asian Karaoke", verbs:'0000000010')
Topic.create(name:"Massage Exchange", verbs:'0000000001')
Topic.create(name:"Medical Marijuana", verbs:'0100000100')
Topic.create(name:"Recreational Marijuana", verbs:'0100000100')
Topic.create(name:"Almost Vegetarians", verbs:'1000000100')
Topic.create(name:"Vegans", verbs:'1000000100')
Topic.create(name:"Vegetarians", verbs:'1000000100')
Topic.create(name:"Trying Rare Cuisines", verbs:'0000000100')
Topic.create(name:"Beer", verbs:'0000000100')
Topic.create(name:"Wine Tasting", verbs:'0000000100')
Topic.create(name:"Raw Food", verbs:'0000000100')
Topic.create(name:"Group Dinner Deals", verbs:'0000000100')
Topic.create(name:"Cooking Dinner Parties", verbs:'0000000100')
Topic.create(name:"BBQ", verbs:'0000000100')
Topic.create(name:"Indian Food", verbs:'0000000100')
Topic.create(name:"Gluten-Free", verbs:'0000000100')
Topic.create(name:"Diners", verbs:'0000000100')
Topic.create(name:"Korean Food", verbs:'0000000100')
Topic.create(name:"Korean Barbecue", verbs:'0000000100')
Topic.create(name:"Sushi", verbs:'0000000100')
Topic.create(name:"South American Cuisine", verbs:'0000000100')
Topic.create(name:"Mexican Cuisine", verbs:'0000000100')
Topic.create(name:"Asian Cuisine", verbs:'0000000100')
Topic.create(name:"Dim Sum", verbs:'0000000100')
Topic.create(name:"Mediterranean Cuisine", verbs:'0000000100')
Topic.create(name:"Molecular Gastronomy", verbs:'0000000100')
Topic.create(name:"Trying New Restaurants", verbs:'0000000100')
Topic.create(name:"Hot Pot", verbs:'0000000100')
Topic.create(name:"Soul Food", verbs:'0000000100')
Topic.create(name:"Fine Dining", verbs:'0000000100')
Topic.create(name:"Michelin Rated Restaurants", verbs:'0000000100')
Topic.create(name:"Ramen", verbs:'0000000100')
Topic.create(name:"Keto", verbs:'0000000100')
Topic.create(name:"Paleo", verbs:'0000000100')
Topic.create(name:"Coffee Shops", verbs:'0000000110')
Topic.create(name:"MMA", verbs:'0010101000')
Topic.create(name:"Art", verbs:'0000101000')
Topic.create(name:"Stand-Up Comedy", verbs:'0000101000')
Topic.create(name:"Piano", verbs:'0000101000')
Topic.create(name:"Guitar", verbs:'0000101000')
Topic.create(name:"Mixed Media Art", verbs:'0000101000')
Topic.create(name:"Street Photography", verbs:'0000101010')
Topic.create(name:"Live Music", verbs:'0000001000')
Topic.create(name:"English Language", verbs:'0000011000')
Topic.create(name:"Performing Arts", verbs:'0000001000')
Topic.create(name:"Theater", verbs:'0000001000')
Topic.create(name:"Asian Film", verbs:'0000001000')
Topic.create(name:"Film", verbs:'0000001000')
Topic.create(name:"Movie Nights", verbs:'0000001000')
Topic.create(name:"Indie Films", verbs:'0000001000')
Topic.create(name:"Art Galleries", verbs:'0000001000')
Topic.create(name:"Sci-Fi/Fantasy", verbs:'0000011000')
Topic.create(name:"Movies in Movie Theaters", verbs:'0000001010')
Topic.create(name:"Jazz", verbs:'0000001000')
Topic.create(name:"Film Festivals", verbs:'0000001010')
Topic.create(name:"Star Wars", verbs:'0000011000')
Topic.create(name:"Festivals", verbs:'0000001010')
Topic.create(name:"NFL Football", verbs:'0000001000')
Topic.create(name:"Indie Music", verbs:'0000001000')
Topic.create(name:"EDM", verbs:'0000001000')
Topic.create(name:"House", verbs:'0000001000')
Topic.create(name:"Country", verbs:'0000001000')
Topic.create(name:"Pop", verbs:'0000001000')
Topic.create(name:"Hip Hop", verbs:'0000001000')
Topic.create(name:"Rap", verbs:'0000001000')
Topic.create(name:"Rock", verbs:'0000001000')
Topic.create(name:"K-Pop", verbs:'0000001000')
Topic.create(name:"Metal", verbs:'0000001000')
Topic.create(name:"R&B", verbs:'0000001000')
Topic.create(name:"Punk", verbs:'0000001000')
Topic.create(name:"Alternative Rock", verbs:'0000001000')
Topic.create(name:"Folk", verbs:'0000001000')
Topic.create(name:"UFC", verbs:'0000001000')
Topic.create(name:"Foreign Film", verbs:'0000001000')
Topic.create(name:"Drama", verbs:'0000001000')
Topic.create(name:"Game of Thrones", verbs:'0000001000')
Topic.create(name:"The Walking Dead", verbs:'0000001000')
Topic.create(name:"Empire", verbs:'0000001000')
Topic.create(name:"Scandal", verbs:'0000001000')
Topic.create(name:"How to get Away with Murder", verbs:'0000001000')
Topic.create(name:"Star Trek", verbs:'0000001000')
Topic.create(name:"Grey's Anatomy", verbs:'0000001000')
Topic.create(name:"The Voice", verbs:'0000001000')
Topic.create(name:"The Bachelor", verbs:'0000001000')
Topic.create(name:"Marvel TV Shows", verbs:'0000001000')
Topic.create(name:"Marvel Movies", verbs:'0000001000')
Topic.create(name:"Horror Films", verbs:'0000001000')
Topic.create(name:"Fashion Shows", verbs:'0000001000')
Topic.create(name:"Techno Music", verbs:'0000001000')
Topic.create(name:"B-Movies", verbs:'0000001000')
Topic.create(name:"World Music", verbs:'0000001000')
Topic.create(name:"Korean Drama", verbs:'0000001000')
Topic.create(name:"Short Films", verbs:'0000001000')
Topic.create(name:"Musical Theatre", verbs:'0000001000')
Topic.create(name:"Open Mic", verbs:'0000001010')
Topic.create(name:"NBA", verbs:'0000001000')
Topic.create(name:"MLB", verbs:'0000001000')
Topic.create(name:"Narcos", verbs:'0000001000')
Topic.create(name:"Anime", verbs:'0000001000')
Topic.create(name:"Attack on Titan", verbs:'0000001000')
Topic.create(name:"Social Dancing", verbs:'0010100010')
Topic.create(name:"Salsa", verbs:'0010100010')
Topic.create(name:"Latin Dance", verbs:'0010100000')
Topic.create(name:"Martial Arts", verbs:'0010100000')
Topic.create(name:"Brazilian Jiu-Jitsu", verbs:'0010100000')
Topic.create(name:"Capoeira", verbs:'0010100000')
Topic.create(name:"Muay Thai", verbs:'0010100000')
Topic.create(name:"Karate", verbs:'0010100000')
Topic.create(name:"Taekwondo", verbs:'0010100000')
Topic.create(name:"Professional Development", verbs:'0100100000')
Topic.create(name:"Financial Planning", verbs:'0100100000')
Topic.create(name:"Options Trading", verbs:'0100100000')
Topic.create(name:"Makeup Artists", verbs:'0100100000')
Topic.create(name:"Wellness", verbs:'0000100000')
Topic.create(name:"Dance Lessons", verbs:'0000100000')
Topic.create(name:"Self Exploration", verbs:'0000100000')
Topic.create(name:"Consciousness", verbs:'0000100000')
Topic.create(name:"Spiritual Growth", verbs:'0000100000')
Topic.create(name:"Cultural Exchange", verbs:'0000110010')
Topic.create(name:"Language Exchange", verbs:'0000110010')
Topic.create(name:"Personal Development", verbs:'0000100000')
Topic.create(name:"Metaphysics", verbs:'0000110000')
Topic.create(name:"Photography Classes", verbs:'0000100010')
Topic.create(name:"Law of Attraction", verbs:'0000100000')
Topic.create(name:"Leadership Workshops", verbs:'0000100000')
Topic.create(name:"Communication Skills", verbs:'0000100000')
Topic.create(name:"Painting Classes", verbs:'0000100000')
Topic.create(name:"Live Model Drawing", verbs:'0000100000')
Topic.create(name:"Portrait Photography", verbs:'0000100000')
Topic.create(name:"Public Speaking", verbs:'0000100000')
Topic.create(name:"Crafts", verbs:'0000100000')
Topic.create(name:"Japanese Language", verbs:'0000100000')
Topic.create(name:"Acting", verbs:'0000100000')
Topic.create(name:"Mindfulness", verbs:'0000100000')
Topic.create(name:"Life Coaching", verbs:'0000100000')
Topic.create(name:"ESL practice", verbs:'0000100000')
Topic.create(name:"Studio Photography", verbs:'0000100000')
Topic.create(name:"Screenwriting", verbs:'0000100000')
Topic.create(name:"Independent Filmmaking", verbs:'0000100000')
Topic.create(name:"Chinese language", verbs:'0000100000')
Topic.create(name:"Fashion Photography", verbs:'0000100000')
Topic.create(name:"Poetry", verbs:'0000100000')
Topic.create(name:"Sketching", verbs:'0000100000')
Topic.create(name:"Español", verbs:'0000100000')
Topic.create(name:"Italian Language", verbs:'0000100000')
Topic.create(name:"Korean Language", verbs:'0000100000')
Topic.create(name:"Hatha Yoga", verbs:'0000100000')
Topic.create(name:"Buddhist Meditation", verbs:'0000100000')
Topic.create(name:"Cooking Classes", verbs:'0000100000')
Topic.create(name:"Improv", verbs:'0000100000')
Topic.create(name:"NLP (Neuro-Linguistic Programming)", verbs:'0000110000')
Topic.create(name:"Massage Therapy", verbs:'0000100000')
Topic.create(name:"Stock Market", verbs:'0000110000')
Topic.create(name:"Arabic Language", verbs:'0000100000')
Topic.create(name:"Short Story Writing", verbs:'0000100000')
Topic.create(name:"Debating", verbs:'0000100000')
Topic.create(name:"Breakfast", verbs:'0000100000')
Topic.create(name:"Brunch Deals", verbs:'0000100000')
Topic.create(name:"Cantonese Language", verbs:'0000100000')
Topic.create(name:"Jewelry Making", verbs:'0000100000')
Topic.create(name:"Dog Training", verbs:'0000100000')
Topic.create(name:"Bitcoins", verbs:'0000110000')
Topic.create(name:"Bollywood Dancing", verbs:'0000100000')
Topic.create(name:"Mandarin Learning", verbs:'0000100000')
Topic.create(name:"Dutch Language", verbs:'0000100000')
Topic.create(name:"Job Interview Prep", verbs:'0000100000')
Topic.create(name:"Hindi Language", verbs:'0000100000')
Topic.create(name:"Knitting", verbs:'0000100000')
Topic.create(name:"Scrapbooking Classes & Workshops", verbs:'0000100000')
Topic.create(name:"Art Classes", verbs:'0000100000')
Topic.create(name:"Foraging", verbs:'0000100010')
Topic.create(name:"Sculpture", verbs:'0000100000')
Topic.create(name:"Live Action Role Playing", verbs:'0011000000')
Topic.create(name:"Strategy Games", verbs:'0001000000')
Topic.create(name:"Tabletop Role Playing", verbs:'0001000000')
Topic.create(name:"Board Games", verbs:'0001000000')
Topic.create(name:"War Games", verbs:'0001000000')
Topic.create(name:"Pathfinder Roleplaying Game", verbs:'0001000000')
Topic.create(name:"Poker Tournaments", verbs:'0001000000')
Topic.create(name:"Texas Hold 'em", verbs:'0001000000')
Topic.create(name:"Fighting Games", verbs:'0001000000')
Topic.create(name:"Street Fighter", verbs:'0001000000')
Topic.create(name:"CS:GO", verbs:'0001000000')
Topic.create(name:"Dota 2", verbs:'0001000000')
Topic.create(name:"Hearthstone", verbs:'0001000000')
Topic.create(name:"Super Smash Brothers", verbs:'0001000000')
Topic.create(name:"League of Legends", verbs:'0001000000')
Topic.create(name:"Mortal Kombat", verbs:'0001000000')
Topic.create(name:"Starcraft", verbs:'0001000000')
Topic.create(name:"Overwatch", verbs:'0001000000')
Topic.create(name:"Minecraft", verbs:'0001000000')
Topic.create(name:"Pokemon Go", verbs:'0001000000')
Topic.create(name:"Settlers of Catan", verbs:'0001000000')
Topic.create(name:"Cards Against Humanity", verbs:'0001000000')
Topic.create(name:"Classic Board Games", verbs:'0001000000')
Topic.create(name:"Pokemon", verbs:'0001000000')
Topic.create(name:"Magic: The Gathering", verbs:'0001000000')
Topic.create(name:"Chess", verbs:'0001000000')
Topic.create(name:"Go", verbs:'0001000000')
Topic.create(name:"Warhammer", verbs:'0001000000')
Topic.create(name:"Scrabble", verbs:'0001000000')
Topic.create(name:"Euchre", verbs:'0001000000')
Topic.create(name:"HALO", verbs:'0001000000')
Topic.create(name:"Call of Duty", verbs:'0001000000')
Topic.create(name:"Bridge", verbs:'0001000000')
Topic.create(name:"Casino Nights", verbs:'0001000010')
Topic.create(name:"White", verbs:'1000000000')
Topic.create(name:"Native American", verbs:'1000000000')
Topic.create(name:"Experienced Soccer Players", verbs:'1010000000')
Topic.create(name:"Christian Singles", verbs:'1000000000')
Topic.create(name:"Social Activism", verbs:'0000010000')
Topic.create(name:"Hiking", verbs:'0010000010')
Topic.create(name:"Dancing", verbs:'0010000000')
Topic.create(name:"Walks", verbs:'0010000000')
Topic.create(name:"Outdoor  Fitness", verbs:'0010000000')
Topic.create(name:"Yoga", verbs:'0010000000')
Topic.create(name:"Kayaking", verbs:'0010000010')
Topic.create(name:"Weight Loss", verbs:'0010000000')
Topic.create(name:"Recreational Sports", verbs:'0010000000')
Topic.create(name:"Bicycling", verbs:'0010000000')
Topic.create(name:"Social Dancing", verbs:'0010000010')
Topic.create(name:"Co-ed Volleyball", verbs:'0010000000')
Topic.create(name:"Snowboarding", verbs:'0010000000')
Topic.create(name:"Tennis", verbs:'0010000000')
Topic.create(name:"Coed Soccer", verbs:'0010000000')
Topic.create(name:"Canoeing", verbs:'0010000000')
Topic.create(name:"Trail Running", verbs:'0010000000')
Topic.create(name:"Swing Dancing", verbs:'0010000000')
Topic.create(name:"Outdoor Soccer", verbs:'0010000000')
Topic.create(name:"Trekking", verbs:'0010000010')
Topic.create(name:"Badminton", verbs:'0010000000')
Topic.create(name:"Bouldering", verbs:'0010000000')
Topic.create(name:"Stand Up Paddle Boarding", verbs:'0010000000')
Topic.create(name:"Bicycle Touring", verbs:'0010000010')
Topic.create(name:"Ice Climbing", verbs:'0010000000')
Topic.create(name:"Indoor Wall Climbing", verbs:'0010000000')
Topic.create(name:"Ping Pong", verbs:'0010000000')
Topic.create(name:"Country Dancing", verbs:'0010000010')
Topic.create(name:"Ice Skating", verbs:'0010000000')
Topic.create(name:"Scuba Diving", verbs:'0010000000')
Topic.create(name:"Rappelling", verbs:'0010000000')
Topic.create(name:"Golf", verbs:'0010000010')
Topic.create(name:"Women Entrepreneurs", verbs:'1100000000')
Topic.create(name:"Artists", verbs:'1100000000')
Topic.create(name:"Musicians", verbs:'1100000000')
Topic.create(name:"Black Professionals", verbs:'1100000000')
Topic.create(name:"Gay Professionals", verbs:'1100000000')
Topic.create(name:"Models", verbs:'1100000000')
Topic.create(name:"Authors", verbs:'1100000000')
Topic.create(name:"Freelancers", verbs:'1100000000')
Topic.create(name:"Professional Networking (General)", verbs:'0100000000')
Topic.create(name:"Entrepreneurship Networking", verbs:'0100000000')
Topic.create(name:"Web Development", verbs:'0100000000')
Topic.create(name:"Computer Programming", verbs:'0100000000')
Topic.create(name:"Small Business Networking", verbs:'0100000000')
Topic.create(name:"Open Source", verbs:'0100000000')
Topic.create(name:"Technology", verbs:'0100000000')
Topic.create(name:"Mobile Development", verbs:'0100000000')
Topic.create(name:"Web Design", verbs:'0100000000')
Topic.create(name:"Business Referral Networking", verbs:'0100000000')
Topic.create(name:"Big Data", verbs:'0100000000')
Topic.create(name:"Marketing", verbs:'0100000000')
Topic.create(name:"JavaScript", verbs:'0100000000')
Topic.create(name:"Lean Startup", verbs:'0100000000')
Topic.create(name:"Cloud Computing", verbs:'0100000000')
Topic.create(name:"Internet Professionals", verbs:'0100000000')
Topic.create(name:"Data Analytics", verbs:'0100000000')
Topic.create(name:"Machine Learning", verbs:'0100000000')
Topic.create(name:"Education & Technology", verbs:'0100000000')
Topic.create(name:"Data Visualization", verbs:'0100000000')
Topic.create(name:"Venture Capital", verbs:'0100000000')
Topic.create(name:"Android Development", verbs:'0100000000')
Topic.create(name:"iOS Development", verbs:'0100000000')
Topic.create(name:"Real Estate Investors", verbs:'0100000000')
Topic.create(name:"Executive Coaching", verbs:'0100000000')
Topic.create(name:"Investing", verbs:'0100000000')
Topic.create(name:"Hadoop", verbs:'0100000000')
Topic.create(name:"User Experience", verbs:'0100000000')
Topic.create(name:"Java", verbs:'0100000000')
Topic.create(name:"Robotics", verbs:'0100000000')
Topic.create(name:"Business Intelligence", verbs:'0100000000')
Topic.create(name:"Graphic Design", verbs:'0100000000')
Topic.create(name:"PHP", verbs:'0100000000')
Topic.create(name:"SEO (Search Engine Optimization)", verbs:'0100000000')
Topic.create(name:"Service Industry", verbs:'0100000000')
Topic.create(name:"Film Industry", verbs:'0100000000')
Topic.create(name:"Ruby", verbs:'0100000000')
Topic.create(name:"Nonprofit", verbs:'0100000000')
Topic.create(name:"Fashion Industry", verbs:'0100000000')
Topic.create(name:"IT Professionals", verbs:'0100000000')
Topic.create(name:"Game Development", verbs:'0100000000')
Topic.create(name:"Beauty Industry", verbs:'0100000000')
Topic.create(name:"Quality Assurance", verbs:'0100000000')
Topic.create(name:"3D Artists", verbs:'0100000000')
Topic.create(name:"Banking", verbs:'0100000000')
Topic.create(name:"Human Resources", verbs:'0100000000')
Topic.create(name:"Industrial Design", verbs:'0100000000')
Topic.create(name:"Consulting", verbs:'0100000000')
Topic.create(name:"Accounting", verbs:'0100000000')
Topic.create(name:"New In Town", verbs:'1000000000')
Topic.create(name:"Single", verbs:'1000000000')
Topic.create(name:"Travellers", verbs:'1000000000')
Topic.create(name:"Women", verbs:'1000000000')
Topic.create(name:"Foodies", verbs:'1000000000')
Topic.create(name:"People in their 20s", verbs:'1000000000')
Topic.create(name:"People in their 30s", verbs:'1000000000')
Topic.create(name:"Young Professional Singles", verbs:'1000000000')
Topic.create(name:"Young Professionals", verbs:'1000000000')
Topic.create(name:"Singles 30's-50's", verbs:'1000000000')
Topic.create(name:"Professional Women", verbs:'1000000000')
Topic.create(name:"Couples", verbs:'1000000000')
Topic.create(name:"Moms", verbs:'1000000000')
Topic.create(name:"LGBT", verbs:'1000000000')
Topic.create(name:"Parents", verbs:'1000000000')
Topic.create(name:"Single Parents", verbs:'1000000000')
Topic.create(name:"Geeks & Nerds", verbs:'1000000000')
Topic.create(name:"Stay-at-Home Moms", verbs:'1000000000')
Topic.create(name:"Psychics", verbs:'1000000000')
Topic.create(name:"Black Women", verbs:'1000000000')
Topic.create(name:"Atheists", verbs:'1000000000')
Topic.create(name:"Dog Owners", verbs:'1000000000')
Topic.create(name:"Buddhists", verbs:'1000000000')
Topic.create(name:"Solo Travelers", verbs:'1000000000')
Topic.create(name:"Pagans", verbs:'1000000000')
Topic.create(name:"Christians", verbs:'1000000000')
Topic.create(name:"People that Work at Home", verbs:'1000000000')
Topic.create(name:"Asian Professionals", verbs:'1000000000')
Topic.create(name:"Introverts", verbs:'1000000000')
Topic.create(name:"Extroverts", verbs:'1000000000')
Topic.create(name:"African American Women", verbs:'1000000000')
Topic.create(name:"Agnostics", verbs:'1000000000')
Topic.create(name:"Asian Americans", verbs:'1000000000')
Topic.create(name:"Jewish", verbs:'1000000000')
Topic.create(name:"Jewish Singles", verbs:'1000000000')
Topic.create(name:"South Asians", verbs:'1000000000')
Topic.create(name:"Women Programmers", verbs:'1000000000')
Topic.create(name:"Hispanic Professionals", verbs:'1000000000')
Topic.create(name:"Divorced", verbs:'1000000000')
Topic.create(name:"Witches", verbs:'1000000000')
Topic.create(name:"Expat Japanese", verbs:'1000000000')
Topic.create(name:"Recovering from Religion", verbs:'1000000000')
Topic.create(name:"Indian Singles", verbs:'1000000000')
Topic.create(name:"Asian Singles", verbs:'1000000000')
Topic.create(name:"Expat Chinese", verbs:'1000000000')
Topic.create(name:"Expat Canadian", verbs:'1000000000')
Topic.create(name:"College Students", verbs:'1000000000')
Topic.create(name:"People in their 40s", verbs:'1000000000')
Topic.create(name:"People that are 50+", verbs:'1000000000')
Topic.create(name:"Born Again Christians", verbs:'1000000000')
Topic.create(name:"Tea Party", verbs:'1000000000')
Topic.create(name:"Gay Single Men", verbs:'1000000000')
Topic.create(name:"Bisexual", verbs:'1000000000')
Topic.create(name:"Expat European", verbs:'1000000000')
Topic.create(name:"Muslim", verbs:'1000000000')
Topic.create(name:"Libertarian", verbs:'1000000000')
Topic.create(name:"Socialist", verbs:'1000000000')
Topic.create(name:"Anarchist", verbs:'1000000000')
Topic.create(name:"Communist", verbs:'1000000000')
Topic.create(name:"Feminists", verbs:'1000000000')
Topic.create(name:"Single Dads", verbs:'1000000000')
Topic.create(name:"Polyamorous", verbs:'1000000000')
Topic.create(name:"Italiano", verbs:'1000000000')
Topic.create(name:"Motorcyclists", verbs:'1000000000')
Topic.create(name:"Swingers", verbs:'1000000001')
Topic.create(name:"Bisexual Femme", verbs:'1000000000')
Topic.create(name:"Conservatives", verbs:'1000000000')
Topic.create(name:"Autistic", verbs:'1000000000')
Topic.create(name:"Brights", verbs:'1000000000')
Topic.create(name:"Asperger Syndrome", verbs:'1000000000')
Topic.create(name:"Liberals", verbs:'1000000000')
Topic.create(name:"Bisexual Men", verbs:'1000000000')
Topic.create(name:"ADHD", verbs:'1000000000')
Topic.create(name:"Russians", verbs:'1000000000')
Topic.create(name:"Eastern European", verbs:'1000000000')
Topic.create(name:"Republican Party", verbs:'1000010000')
Topic.create(name:"Democratic Party", verbs:'1000010000')
Topic.create(name:"Libertarian Party", verbs:'1000010000')
Topic.create(name:"Green Party", verbs:'1000010000')
Topic.create(name:"Gun Owner", verbs:'1000000000')
Topic.create(name:"Highly Sensitive People", verbs:'1000000000')
Topic.create(name:"Unemployed", verbs:'1000000000')
Topic.create(name:"Transgender", verbs:'1000000000')
Topic.create(name:"Native American", verbs:'1000000000')
Topic.create(name:"Black", verbs:'1000000000')
Topic.create(name:"Latino", verbs:'1000000000')
Topic.create(name:"Filipino-American", verbs:'1000000000')
Topic.create(name:"Middle-Eastern", verbs:'1000000000')
Topic.create(name:"Christian Women", verbs:'1000000000')
Topic.create(name:"Veterans", verbs:'1000000000')
Topic.create(name:"Pansexual", verbs:'1000000000')
Topic.create(name:"Mormons", verbs:'1000000000')
Topic.create(name:"Ex-Mormons", verbs:'1000000000')
Topic.create(name:"Feminists", verbs:'1000000000')
Topic.create(name:"Scavenger Hunts", verbs:'0000000010')
Topic.create(name:"Nightlife", verbs:'0000000010')
Topic.create(name:"Travel Discussion", verbs:'0000010000')
Topic.create(name:"Self-Empowerment", verbs:'0000100000')
Topic.create(name:"Happy Hour", verbs:'0000000010')
Topic.create(name:"Clubbing", verbs:'0000000010')
Topic.create(name:"Social Issues", verbs:'0000010000')
Topic.create(name:"Politics", verbs:'0000010000')
Topic.create(name:"Bar Crawls", verbs:'0000000010')
Topic.create(name:"International Friends", verbs:'0000010010')
Topic.create(name:"Photography Trips", verbs:'0000000010')
Topic.create(name:"Intellectual Discussion", verbs:'0000010000')
Topic.create(name:"Book Club", verbs:'0000010000')
Topic.create(name:"Volunteering", verbs:'0000000010')
Topic.create(name:"Women's Empowerment", verbs:'0000010000')
Topic.create(name:"Girls' Night Out", verbs:'0000000010')
Topic.create(name:"Nature Photography", verbs:'0000000010')
Topic.create(name:"Weekend Getaways", verbs:'0000000010')
Topic.create(name:"Local Events", verbs:'0000000010')
Topic.create(name:"Japanese Culture", verbs:'0000010000')
Topic.create(name:"Reading", verbs:'0000010000')
Topic.create(name:"Environment", verbs:'0000010010')
Topic.create(name:"Philosophy", verbs:'0000010000')
Topic.create(name:"Chinese Culture", verbs:'0000010000')
Topic.create(name:"Pick-Up Soccer", verbs:'0010000001')
Topic.create(name:"Humanism", verbs:'0000010000')
Topic.create(name:"French Culture", verbs:'0000010000')
Topic.create(name:"Art Museums", verbs:'0000000010')
Topic.create(name:"System Administration", verbs:'0100000000')
Topic.create(name:"Brunch", verbs:'0000000010')
Topic.create(name:"Psychology", verbs:'0000010000')
Topic.create(name:"Karaoke", verbs:'0000000010')
Topic.create(name:"Spanish & English Language Exchange", verbs:'0000010000')
Topic.create(name:"Latino Culture", verbs:'0000010000')
Topic.create(name:"Spanish Culture", verbs:'0000010000')
Topic.create(name:"Animal Rights", verbs:'0000010000')
Topic.create(name:"Indian Culture", verbs:'0000010000')
Topic.create(name:"Religion", verbs:'0000010000')
Topic.create(name:"Birdwatching", verbs:'0000000010')
Topic.create(name:"Sightseeing", verbs:'0000000010')
Topic.create(name:"Book Swap", verbs:'0000010000')
Topic.create(name:"Road Trips", verbs:'0000000010')
Topic.create(name:"Speed Dating", verbs:'0000000010')
Topic.create(name:"Pub Crawls", verbs:'0000000010')
Topic.create(name:"Museums & Galleries", verbs:'0000000010')
Topic.create(name:"Social Movements", verbs:'0000010000')
Topic.create(name:"Economics", verbs:'0000010000')
Topic.create(name:"Feminism", verbs:'0000010000')
Topic.create(name:"Friday Night Socials", verbs:'0000000010')
Topic.create(name:"Comedy Clubs", verbs:'0000000010')
Topic.create(name:"Weight Loss Challenge", verbs:'0010000001')
Topic.create(name:"Asian Culture", verbs:'0000010000')
Topic.create(name:"Bicycle Riding", verbs:'0000000000')
Topic.create(name:"Geocaching", verbs:'0000000010')
Topic.create(name:"Black Culture", verbs:'0000010000')
Topic.create(name:"Interracial Dating", verbs:'0000000010')
Topic.create(name:"Brazilian Culture", verbs:'0000010000')
Topic.create(name:"Taiwanese Culture", verbs:'0000010000')
Topic.create(name:"Paranormal", verbs:'0000010000')
Topic.create(name:"Russian Culture", verbs:'0000010000')
Topic.create(name:"Psychotherapy", verbs:'0000010000')
Topic.create(name:"Ghost Tracking", verbs:'0000000010')
Topic.create(name:"American History", verbs:'0000010000')
Topic.create(name:"Support Group", verbs:'0000010000')
Topic.create(name:"Hardware Hacks & Gadgeteering", verbs:'0000100000')
Topic.create(name:"Arabic Culture", verbs:'0000010000')
Topic.create(name:"LAN Party", verbs:'0000000010')

user1 = User.create(username: "Michael", email: "Michael@atlas.com")
user2 = User.create(username: "Frank", email: "Frank@atlas.com")
user3 = User.create(username: "Fronk", email: "Fronk@atlas.com")
user4 = User.create(username: "Mike", email: "Mike@atlas.com")
user5 = User.create(username: "Novice", email: "Novice@atlas.com")
user6 = User.create(username: "Joson", email: "Joson@atlas.com")
user7 = User.create(username: "WoundedTuna", email: "WoundedTuna@atlas.com")
user8 = User.create(username: "Parrot", email: "Parrot@atlas.com")
user9 = User.create(username: "Trump", email: "Trump@atlas.com")
user10 = User.create(username: "Hilaroo", email: "Hilaroo@atlas.com")
user11 = User.create(username: "Jillenstein", email: "Jillenstein@atlas.com")
user12 = User.create(username: "GaryJohns", email: "GaryJohns@atlas.com")
user13 = User.create(username: "Amandapls", email: "Amandapls@atlas.com")
user14 = User.create(username: "Barathrum", email: "Soultrain@atlas.com")
user15 = User.create(username: "Shaggy", email: "Shaggy@atlas.com")
user16 = User.create(username: 'Moo', email: 'Moo@atlas.com')
user17 = User.create(username: 'Hao', email: 'Hao@atlas.com')
user18 = User.create(username: 'Dendi', email: 'Dendi@atlas.com')
user19 = User.create(username: 'Envy', email: 'Envy@atlas.com')
user20 = User.create(username: 'Xboct', email: 'Xboct@atlas.com')
user21 = User.create(username: 'Moonmeander', email: 'Moonmeander@atlas.com')
user22 = User.create(username: 'FATA', email: 'FATA@atlas.com')
user23 = User.create(username: 'Stella', email: 'Stella@atlas.com')
user24 = User.create(username: 'Kate', email: 'Kate@atlas.com')
user25 = User.create(username: 'Batman', email: 'Batman@atlas.com')
user26 = User.create(username: 'Superman', email: 'Superman@atlas.com')
user27 = User.create(username: 'Flash', email: 'Flash@atlas.com')
user28 = User.create(username: 'WonderWoman', email: 'WonderWoman@atlas.com')
user29 = User.create(username: 'Ash', email: 'Ash@atlas.com')
user30 = User.create(username: 'Misty', email: 'Misty@atlas.com')
user31 = User.create(username: 'Brock', email: 'Brock@atlas.com')
user32 = User.create(username: 'Pikachu', email: 'Pikachu@atlas.com')
user33 = User.create(username: 'Ryu', email: 'Ryu@atlas.com')
user34 = User.create(username: 'Chun_Li', email: 'Chun_Li@atlas.com')
user35 = User.create(username: 'Dhalsim', email: 'Dhalsim@atlas.com')
user36 = User.create(username: 'Zangief', email: 'Zangief@atlas.com')
user37 = User.create(username: 'SarahKerrigan', email: 'SarahKerrigan@atlas.com')
user38 = User.create(username: 'JimRaynor', email: 'JimRaynor@atlas.com')
user39 = User.create(username: 'Atlas', email: 'Atlas@atlas.com')
user40 = User.create(username: 'Zoose', email: 'Zoose@atlas.com')
user41 = User.create(username: 'Hera', email: 'Hera@atlas.com')
user42 = User.create(username: 'Aphrodite', email: 'Aphrodite@atlas.com')
user43 = User.create(username: 'Thor', email: 'Thor@atlas.com')
user44 = User.create(username: 'Valkyrie', email: 'Valkyrie@atlas.com')
user45 = User.create(username: 'Vegeta', email: 'Vegeta@atlas.com')
user46 = User.create(username: 'Barnes', email: 'Barnes@atlas.com')
user47 = User.create(username: 'Sylvanas', email: 'Sylvanas@atlas.com')
user48 = User.create(username: 'Rogue', email: 'Rogue@atlas.com')
user49 = User.create(username: 'Phoenix', email: 'Phoenix@atlas.com')
user50 = User.create(username: 'Jubilee', email: 'Jubilee@atlas.com')
user51 = User.create(username: 'Wolverine', email: 'Wolverine@atlas.com')
user52 = User.create(username: 'Cyclops', email: 'Cyclops@atlas.com')
user53 = User.create(username: 'Gambit', email: 'Gambit@atlas.com')
user54 = User.create(username: 'Goldie', email: 'Goldie@atlas.com')
user55 = User.create(username: 'Wai', email: 'Wai@atlas.com')
user56 = User.create(username: 'Candyce', email: 'Candyce@atlas.com')
user57 = User.create(username: 'Romona', email: 'Romona@atlas.com')
user58 = User.create(username: 'Ying', email: 'Ying@atlas.com')
user59 = User.create(username: 'Sherrie', email: 'Sherrie@atlas.com')
user60 = User.create(username: 'Tilda', email: 'Tilda@atlas.com')
user61 = User.create(username: 'Lola', email: 'Lola@atlas.com')
user62 = User.create(username: 'Sau', email: 'Sau@atlas.com')
user63 = User.create(username: 'Deirdre', email: 'Deirdre@atlas.com')
user64 = User.create(username: 'Meghann', email: 'Meghann@atlas.com')
user65 = User.create(username: 'Tonie', email: 'Tonie@atlas.com')
user66 = User.create(username: 'Willow', email: 'Willow@atlas.com')
user67 = User.create(username: 'Justine', email: 'Justine@atlas.com')
user68 = User.create(username: 'Mina', email: 'Mina@atlas.com')
user69 = User.create(username: 'Kira', email: 'Kira@atlas.com')
user70 = User.create(username: 'Apryl', email: 'Apryl@atlas.com')
user71 = User.create(username: 'Maureen', email: 'Maureen@atlas.com')
user72 = User.create(username: 'Golden', email: 'Golden@atlas.com')
user73 = User.create(username: 'Racquel', email: 'Racquel@atlas.com')
user74 = User.create(username: 'Rosette', email: 'Rosette@atlas.com')
user75 = User.create(username: 'Stefanie', email: 'Stefanie@atlas.com')
user76 = User.create(username: 'Kaye', email: 'Kaye@atlas.com')
user77 = User.create(username: 'Ruthe', email: 'Ruthe@atlas.com')
user78 = User.create(username: 'Erica', email: 'Erica@atlas.com')
user79 = User.create(username: 'Lashell', email: 'Lashell@atlas.com')
user80 = User.create(username: 'Mao', email: 'Mao@atlas.com')
user81 = User.create(username: 'Bobette', email: 'Bobette@atlas.com')
user82 = User.create(username: 'Shelly', email: 'Shelly@atlas.com')
user83 = User.create(username: 'Jaye', email: 'Jaye@atlas.com')
user84 = User.create(username: 'Tiffanie', email: 'Tiffanie@atlas.com')
user85 = User.create(username: 'Monserrate', email: 'Monserrate@atlas.com')
user86 = User.create(username: 'Harriett', email: 'Harriett@atlas.com')
user87 = User.create(username: 'Stella', email: 'Stella@atlas.com')
user88 = User.create(username: 'Laci', email: 'Laci@atlas.com')
user89 = User.create(username: 'Lenita', email: 'Lenita@atlas.com')
user90 = User.create(username: 'Arnita', email: 'Arnita@atlas.com')
user91 = User.create(username: 'Luise', email: 'Luise@atlas.com')
user92 = User.create(username: 'Lynell', email: 'Lynell@atlas.com')
user93 = User.create(username: 'Bulah', email: 'Bulah@atlas.com')
user94 = User.create(username: 'Gayla', email: 'Gayla@atlas.com')
user95 = User.create(username: 'Lanell', email: 'Lanell@atlas.com')
user96 = User.create(username: 'Tina', email: 'Tina@atlas.com')
user97 = User.create(username: 'Celinda', email: 'Celinda@atlas.com')
user98 = User.create(username: 'Adelle', email: 'Adelle@atlas.com')
user99 = User.create(username: 'Mariann', email: 'Mariann@atlas.com')
user100 = User.create(username: 'Marjorie', email: 'Marjorie@atlas.com')
user101 = User.create(username: 'Leatrice', email: 'Leatrice@atlas.com')
user102 = User.create(username: 'Emilie', email: 'Emilie@atlas.com')
user103 = User.create(username: 'Belia', email: 'Belia@atlas.com')

event1 = Event.create(name: "BBQ",description: "We will be having a bbq" ,date: "2016-10-14 04:05:06",location: "Green Street Smoked Meats")
event2 = Event.create(name: "Trade Pokemon Cards",description: "We will be trading pokemon cards" ,date: "2016-10-14 04:05:06",location: "Dice Dojo")
event3 = Event.create(name: "Vote for Trump",description: "We will be making america terrible" ,date: "2016-11-28 04:05:06",location: "McDonald's")
event4 = Event.create(name: "Who is the sexiest anime character and why is it Vegeta?",description: "We will be making america terrible" ,date: "2016-11-28 04:05:06",location: "McDonald's")
event5 = Event.create(name: "LAN Party",description: "LAN Party wooo" ,date: "2016-11-28 04:05:06",location: "Ignite Gaming Lounge")

event1.topics << Topic.find_by(name:"BBQ")
event1.topics << Topic.find_by(name:"Gluten-Free")
event1.topics << Topic.find_by(name:"Diners")
event2.topics << Topic.find_by(name:"Pokemon")
event3.topics << Topic.find_by(name:"Libertarian")
event3.topics << Topic.find_by(name:"Politics")
event4.topics << Topic.find_by(name:"Anime")
event5.topics << Topic.find_by(name:"LAN Party")
event5.topics << Topic.find_by(name:"Dota 2")
event5.topics << Topic.find_by(name:"CS:GO")

event1.hosts << User.all.sample
event2.hosts << User.all.sample
event3.hosts << User.all.sample
event4.hosts << User.all.sample
event5.hosts << User.all.sample

User.all.each do |x|
  event1.attendees << x if rand(2) == 1
  event2.attendees << x if rand(2) == 1
  event3.attendees << x if rand(2) == 1
  event4.attendees << x if rand(2) == 1
  event5.attendees << x if rand(2) == 1
  x.topics << Topic.find_by(name: "Runners") if rand(2) == 1
  x.topics << Topic.find_by(name: "Group Workouts") if rand(2) == 1
  x.topics << Topic.find_by(name: "Social Work") if rand(2) == 1
  x.topics << Topic.find_by(name: "Accountability Partners") if rand(2) == 1
  x.topics << Topic.find_by(name: "Social Coding") if rand(2) == 1
  x.topics << Topic.find_by(name: "Study Halls") if rand(2) == 1
  x.topics << Topic.find_by(name: "Writing Workshops") if rand(2) == 1
  x.topics << Topic.find_by(name: "Drinking Games") if rand(2) == 1
  x.topics << Topic.find_by(name: "Workout Partners") if rand(2) == 1
  x.topics << Topic.find_by(name: "League Sports") if rand(2) == 1
  x.topics << Topic.find_by(name: "Bowling") if rand(2) == 1
  x.topics << Topic.find_by(name: "Marathon Training") if rand(2) == 1
  x.topics << Topic.find_by(name: "Ultimate Frisbee") if rand(2) == 1
  x.topics << Topic.find_by(name: "Softball") if rand(2) == 1
  Topic.all.sample(11).each do |y|
    x.topics << y if !x.topics.include?(y)
  end
end

Zipcode.where("zipcode LIKE '606%' OR zipcode LIKE '600%'").each do |x|
  event1.zipcodes << x if rand(8) == 1
  event2.zipcodes << x if rand(8) == 1
  event3.zipcodes << x if rand(8) == 1
  event4.zipcodes << x if rand(8) == 1
  event5.zipcodes << x if rand(8) == 1
end


User.all.each do |y|
  y.zip_code = Zipcode.where("zipcode LIKE '606%' OR zipcode LIKE '600%'").sample.zipcode
  y.save
end