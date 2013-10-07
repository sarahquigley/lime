class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :list_id, null: false
      t.string :title, null: false
      t.text :description
      t.integer :priority
      t.datetime :due
      t.boolean :completed, null: false, default: false
      t.boolean :archived, null: false, default: false
      t.integer :list_position, null: false

      t.timestamps
    end

    add_index :tasks, :list_id
  end
end
