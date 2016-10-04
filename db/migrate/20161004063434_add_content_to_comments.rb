class AddContentToComments < ActiveRecord::Migration[5.0]
  def change
  	add_column :comments, :content, :string
  end
end
