class Theme < ApplicationRecord
	belongs_to :topic
  belongs_to :event
  validates_uniqueness_of :event_id, scope: :topic_id
end
