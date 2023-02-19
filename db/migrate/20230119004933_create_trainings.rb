class CreateTrainings < ActiveRecord::Migration[7.0]
  def change
    create_table :trainings do |t|
      t.references :exercise, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :calorie, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
