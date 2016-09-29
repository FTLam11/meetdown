class CreateNeighbors < ActiveRecord::Migration[5.0]
  def change
    create_table :neighbors do |t|
      t.string :zipcode_1
      t.string :zipcode_2
      t.float :distance

      t.timestamps
    end
  end
end
