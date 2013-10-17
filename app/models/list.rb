class List < ActiveRecord::Base
  attr_accessible :archived, :completed, :label, :title, :user

  # Relationships
  belongs_to :user, inverse_of: :lists
  has_many :tasks, dependent: :destroy

  # Validations
  validates :title, :user, presence: true

  def task_count
    self.tasks.count
  end

  # Customise as_json
  def as_json(options = nil)
    super(methods: :task_count, include: { tasks: { methods: [ :due_to_s ] , include: :tags } }).merge(options || {})
  end

end
