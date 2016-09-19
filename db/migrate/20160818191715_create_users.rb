class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.integer :zip_code
      t.integer :age
      t.string  :phone_number
      t.string :google_id
      t.timestamps null: false
    end
  end
end
