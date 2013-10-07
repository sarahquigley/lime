class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title
      t.string :label
      t.boolean :completed
      t.boolean :archived
      t.integer :user_id

      t.timestamps
    end
  end
end
