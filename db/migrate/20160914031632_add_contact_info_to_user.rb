class AddContactInfoToUser < ActiveRecord::Migration[5.0]
  change_table :users do |t|
  	 t.string  :phone_number
     t.string :google_id
  end

end
