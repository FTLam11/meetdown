class Neighbor < ApplicationRecord
  validate :same_zip?
  validates_uniqueness_of :zipcode_1, scope: :zipcode_2
  belongs_to :zipcode

  def same_zip?
    if zipcode_1 == zipcode_2
      errors.add(:zipcode_1, 'Zip1 cannot be Zip 2')
    end 
  end
end