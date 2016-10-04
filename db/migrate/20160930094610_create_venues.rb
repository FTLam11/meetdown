class CreateVenues < ActiveRecord::Migration[5.0]
  def change
    create_table :venues do |t|
    	t.integer :zipcode_id
      t.integer :event_id
      t.timestamps
    end
  end
end
