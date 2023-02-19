class CreateLineMenus < ActiveRecord::Migration[7.0]
  def change
    create_table :line_menus do |t|
      t.references :exercise, null: false, foreign_key: true
      t.references :training, null: false, foreign_key: true
      t.references :order, foreign_key: true
      t.integer :rep, null: false, default: 0
      t.boolean :active, null: false, default: false

      t.timestamps
    end
  end
end
