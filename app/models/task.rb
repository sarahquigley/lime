class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list, :list_position, :priority, :title, :tag_ids

  # Callbacks
  before_validation :increment_list_position, on: :create
  after_update :swap_list_positions

  # Relationships
  belongs_to :list, inverse_of: :tasks
  has_many :taggings, inverse_of: :tag
  has_many :tags, through: :taggings

  # Validations
  validates :list, :list_position, :title, presence: true
  validates :list_position, uniqueness: { scope: :list_id, message: "must be unique within list" }, on: :create
  validates :list_position, numericality: { greater_than: 0, only_integer: true }
  validates :priority, numericality: { only_integer: true, greater_than: 0, less_than: 6 }, allow_nil: true
  # validate  :must_have_list_position_in_list, on: :update

  # SAVE: Increment list_position before save
  def increment_list_position
    list = List.find(self.list_id)
    sibling_tasks = list.tasks.order("list_position ASC")
    last_pos_occupied = sibling_tasks.empty? ? 0 : sibling_tasks.last.list_position
    self.list_position = last_pos_occupied + 1
  end

  UPDATE: Swap list_position on update
  def swap_list_positions
    if self.changed_attributes.keys.include?("list_position")
      new_pos = self.list_position
      old_pos = self.changed_attributes["list_position"]
      if new_pos > old_pos      #moving down
        tasks = siblings.where("list_position BETWEEN ? AND ?", old_pos, new_pos)
        tasks.update_all("list_position = list_position - 1")
      elsif new_pos < old_pos  #moving up
        tasks = siblings.where("list_position BETWEEN ? AND ?", new_pos, old_pos)
        tasks.update_all("list_position = list_position + 1")
      end
    end
  end

  VALIDATION: cannot update list position if at end of list
  def must_have_list_position_in_list
    if self.list_position > self.list.tasks.count
      self.errors.add(:list_position, "Cannot move last item in list.")
    end
  end

  # HELPER: sibling tasks
  def siblings
    self.list.tasks.where("id != ?", self.id)
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
    super(methods: :due_to_s, include: :tags ).merge(options || {})
  end


end
