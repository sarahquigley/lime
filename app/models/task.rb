class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list, :list_position, :priority, :title, :tag_ids

  # Callbacks
  before_validation :increment_list_position, on: :create

  # Relationships
  belongs_to :list, inverse_of: :tasks
  has_many :taggings, inverse_of: :tag
  has_many :tags, through: :taggings

  # Validations
  validates :list, :list_position, :title, presence: true
  validates :list_position, uniqueness: { scope: :list_id, message: "must be unique within list" }, on: :create
  validates :list_position, numericality: { greater_than: 0, only_integer: true }
  validates :priority, numericality: { only_integer: true, greater_than: 0, less_than: 6 }, allow_nil: true

  # SAVE: Increment list_position before save
  def increment_list_position
    list = List.find(self.list_id)
    sibling_tasks = list.tasks.order("list_position ASC")
    last_pos_occupied = sibling_tasks.empty? ? 0 : sibling_tasks.last.list_position
    self.list_position = last_pos_occupied + 1
  end

  # Due Date for Display
  def due_to_s
    return nil if self.due == nil
    if overdue?
      return "overdue"
    elsif today?
      return "today"
    elsif tomorrow?
      return "tomorrow"
    elsif this_week?
      return self.due.strftime('%A')
    elsif this_year?
      return self.due.strftime('%e %b %Y')
    else
      return self.due.strftime('%e %b')
    end
  end

  # Due Date Boolean Helpers
  def no_due_date?
    self.due == nil
  end

  def overdue?
    days_from_today < 0
  end

  def today?
    days_from_today == 0
  end

  def tomorrow?
    days_from_today == 1
  end

  def this_week?
    days_from_today < 8
  end

  def this_year?
    self.due.year != Date.today.year
  end

  def days_from_today
    self.due - Date.today
  end

  # Meta Data
  def meta
    meta = {
      no_due_date: no_due_date?,
      overdue: this.overdue?,
      today: this.today?,
      tomorrow: this.tomorrow?,
      this_week: this_week?
    }
  end

  # Customise as_json
  def as_json(options = nil)
    super(methods: :due_to_s, include: :tags ).merge(options || {})
  end


end
