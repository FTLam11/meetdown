class CreateNeighbors < ActiveRecord::Migration[5.0]
  def change
    create_table :neighbors do |t|
      t.integer :zipcode_1
      t.integer :zipcode_2
      t.float :distance

      t.timestamps
    end
  end
end
