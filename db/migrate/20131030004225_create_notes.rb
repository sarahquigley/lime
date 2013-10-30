class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :task_id
      t.text :body

      t.timestamps
    end

    add_index :notes, :task_id
  end
end
