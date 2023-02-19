# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_19_052634) do
  create_table "exercises", force: :cascade do |t|
    t.string "name", null: false
    t.string "category", null: false
    t.integer "time_required", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "line_menus", force: :cascade do |t|
    t.integer "exercise_id", null: false
    t.integer "training_id", null: false
    t.integer "order_id"
    t.integer "rep", default: 0, null: false
    t.boolean "active", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exercise_id"], name: "index_line_menus_on_exercise_id"
    t.index ["order_id"], name: "index_line_menus_on_order_id"
    t.index ["training_id"], name: "index_line_menus_on_training_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "total_calorie", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trainings", force: :cascade do |t|
    t.integer "exercise_id", null: false
    t.string "name", null: false
    t.integer "calorie", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exercise_id"], name: "index_trainings_on_exercise_id"
  end

  add_foreign_key "line_menus", "exercises"
  add_foreign_key "line_menus", "orders"
  add_foreign_key "line_menus", "trainings"
  add_foreign_key "trainings", "exercises"
end
