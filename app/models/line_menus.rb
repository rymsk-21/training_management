class LineMenu < ApplicationRecord
  belongs_to :training
  belongs_to :exercise
  belongs_to :order, optional: true

  validates :rep, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) }
  scope :other_exercise, -> (picked_exercise_id) { where.not(exercise_id: picked_exercise_id) }

  def total_reps
    training.calorie * rep
  end
end