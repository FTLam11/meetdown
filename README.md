# README

* Dependencies

Please see `Gemfile` and `bower.json` for respective backend/frontend dependencies.

* Purpose

InterestAtlas is a web application that visualizes interests of all varieties. Interests are geographically mapped by US zipcode and analyzed using charts and heatmaps. Events can be hosted to build communities based around different interests. InterestAtlas was built using Rails, AngularJS, D3, Google Maps, Google Fusion Tables, Satellizer, AWS, and a multitude of Angular libraries.

* Installation instructions

  * Run `bundle install` to install backend dependencies
  * Run `bower install` to install frontend dependencies
  * Run `rake db:create && rake db:migrate && rake db:seed` to prepare and seed database. Note that seeding takes a **considerable** amount of time. You might want to sip on some grapefruit green tea and go do something fun while you wait.
  * Run `rails s` to launch local server.
  * Navigate to http://localhost:3000
  * Enjoy~!
