class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list, :list_position, :priority, :title

  # Callbacks
  before_validation :increment_list_position, on: :create

  # Relationships
  belongs_to :list

  # Validations
  validates :list, :list_position, :title, presence: true

  # Increment list_position before save
  def increment_list_position
    list = List.find(self.list_id)
    sibling_tasks = list.tasks.order("list_position ASC")
    last_pos_occupied = sibling_tasks.empty? ? 0 : sibling_tasks.last.list_position
    self.list_position = last_pos_occupied + 1
  end

end
