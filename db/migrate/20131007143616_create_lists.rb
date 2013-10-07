class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :user_id
      t.string :title, null: false
      t.string :label
      t.boolean :completed, null: false, default: false
      t.boolean :archived, null:false, default: false

      t.timestamps
    end

    add_index :lists, :user_id
  end
end
