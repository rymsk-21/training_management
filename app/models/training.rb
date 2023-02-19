class Training < ApplicationRecord
  belongs_to :exercise
  belongs_to :order, optional: true
  has_one :line_menu
end
