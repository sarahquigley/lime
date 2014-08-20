class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list, :list_id, :list_position, :priority, :title, :tag_ids

  # Callbacks
  before_validation :increment_list_position, on: :create

  # Relationships
  belongs_to :list, inverse_of: :tasks
  has_many :taggings, inverse_of: :task
  has_many :tags, through: :taggings
  has_many :notes, inverse_of: :task, dependent: :destroy

  # Validations
  validates :list, :list_position, :title, presence: true
  validates :list_position, uniqueness: { scope: :list_id, message: "must be unique within list" }, on: :create
  validates :list_position, numericality: { greater_than: 0, only_integer: true }
  validates :priority, numericality: { only_integer: true, greater_than: 0, less_than: 6 }, allow_nil: true

  # Customise as_json
  def as_json(options = nil)
    super(include: [:tags, :notes]).merge(options || {})
  end

end
