class Tag < ActiveRecord::Base
  attr_accessible :name, :user

  # Relationships
  belongs_to :user
  has_many :taggings, inverse_of: :tag
  has_many :tasks, through: :taggings

  # Validations
  validates :name, presence: true, uniqueness: true

  # Task count
  def task_count
    self.tasks.count
  end

  def as_json(options = nil)
    super(methods: :task_count).merge(options || {})
  end

end
