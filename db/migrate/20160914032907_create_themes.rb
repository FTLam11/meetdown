class CreateThemes < ActiveRecord::Migration[5.0]
  def change
    create_table :themes do |t|
      t.integer :topic_id
      t.integer :event_id

      t.timestamps
    end
  end
end
