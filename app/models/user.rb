class User < ApplicationRecord
  has_secure_password

  def self.parse_json(obj)
    p obj
  end
end
