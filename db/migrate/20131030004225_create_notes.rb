class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :task_id
      t.text :body

      t.timestamps
    end
  end
  add_index :notes, :task_id
end
