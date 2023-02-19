class CreateExercises < ActiveRecord::Migration[7.0]
  def change
    create_table :exercises do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.integer :time_required, null: false

      t.timestamps
    end
  end
end
