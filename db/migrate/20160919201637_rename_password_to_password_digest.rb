class RenamePasswordToPasswordDigest < ActiveRecord::Migration[5.0]
  change_table :users do |t|
    rename_column(:users, :password, :password_digest)
  end
end
