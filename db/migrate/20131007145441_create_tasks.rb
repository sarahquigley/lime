class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.integer :priority
      t.datetime :due
      t.boolean :completed
      t.boolean :archived
      t.integer :list_position
      t.integer :list_id

      t.timestamps
    end
  end
end
