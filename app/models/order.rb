class Order < ApplicationRecord
  has_many :line_menus

  validates :total_calorie, numericality: { greater_than: 0 }

  def save_with_update_line_menus!(line_menus)
    ActiveRecord::Base.transaction do
      line_menus.each do |line_menu|
        line_menu.update_attributes!(active: false, order: self)
      end
      self.save!
    end
  end
end