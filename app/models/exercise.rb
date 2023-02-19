class Exercise < ApplicationRecord
  has_many :trainings
  has_many :line_menus, through: :trainings

  validates :name, :category, :time_required, presence: true
  validates :name, length: { maximum: 30 }
end