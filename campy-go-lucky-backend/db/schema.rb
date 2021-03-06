# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_09_223110) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campsites", force: :cascade do |t|
    t.string "name"
    t.string "latitude"
    t.string "longitude"
    t.string "url"
    t.string "img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "campstops", force: :cascade do |t|
    t.bigint "campsite_id"
    t.bigint "trip_id"
    t.string "state_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campsite_id"], name: "index_campstops_on_campsite_id"
    t.index ["trip_id"], name: "index_campstops_on_trip_id"
  end

  create_table "trails", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "start_date"
    t.string "start_location"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_trips_on_user_id"
  end

  create_table "triptrails", force: :cascade do |t|
    t.bigint "trip_id"
    t.bigint "trail_id"
    t.string "state_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trail_id"], name: "index_triptrails_on_trail_id"
    t.index ["trip_id"], name: "index_triptrails_on_trip_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "campstops", "campsites"
  add_foreign_key "campstops", "trips"
  add_foreign_key "trips", "users"
  add_foreign_key "triptrails", "trails"
  add_foreign_key "triptrails", "trips"
end
