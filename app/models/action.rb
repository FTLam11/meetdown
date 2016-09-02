class Action < ApplicationRecord
  belongs_to :verb
  belongs_to :topic
end
