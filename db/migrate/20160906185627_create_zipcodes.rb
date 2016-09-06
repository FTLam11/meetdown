class CreateZipcodes < ActiveRecord::Migration[5.0]
  def change
    create_table :zipcodes do |t|
      t.string :zipcode
      t.string :geojson

      t.timestamps
    end
  end
end
