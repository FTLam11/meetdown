class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username
      t.integer :zip_code
      t.integer :age

      t.timestamps
    end
  end
end
