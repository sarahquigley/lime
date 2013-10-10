class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list, :list_position, :priority, :title

  # Callbacks
  before_validation :increment_list_position, on: :create

  # Relationships
  belongs_to :list

  # Validations
  validates :list, :list_position, :title, presence: true
  validates :list_position, uniqueness: { scope: :list_id, message: "must be unique within list" }

  # Increment list_position before save
  def increment_list_position
    list = List.find(self.list_id)
    sibling_tasks = list.tasks.order("list_position ASC")
    last_pos_occupied = sibling_tasks.empty? ? 0 : sibling_tasks.last.list_position
    self.list_position = last_pos_occupied + 1
  end

  # Due Date for Display
  def due_to_s
    return nil if self.due == nil
    display = ["Today", "Tomorrow"]
    today = Date.today
    day_diff = self.due - Date.today
    if day_diff < 0
      return "Overdue"
    elsif day_diff < 2
      return display[day_diff]
    elsif day_diff < 8
      return self.due.strftime('%A')
    elsif self.due.year != today.year
      return self.due.strftime('%e %b %Y')
    else
      return self.due.strftime('%e %b')
    end
  end

  # Customise as_json
  def as_json(options = nil)
    super(methods: :due_to_s).merge(options || {})
  end


end
