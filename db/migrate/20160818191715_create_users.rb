class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.integer :zip_code
      t.integer :age
      t.timestamps null: false
    end
  end
end
