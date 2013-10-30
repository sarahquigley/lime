class List < ActiveRecord::Base
  attr_accessible :archived, :completed, :label, :title, :user

  # Relationships
  belongs_to :user, inverse_of: :lists
  has_many :tasks, dependent: :destroy, inverse_of: :list
  has_many :notes, through: :tasks

  # Validations
  validates :title, :user, presence: true

  # Customise as_json
  def as_json(options = nil)
    super(include: { tasks: { include: :tags } }).merge(options || {})
  end

end
