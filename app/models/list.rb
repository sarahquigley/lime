class List < ActiveRecord::Base
  attr_accessible :archived, :completed, :label, :title, :user

  # Relationships
  belongs_to :user
  has_many :tasks, dependent: :destroy

  # Validations
  validates :title, :user, presence: true

  # Customise as_json
  def as_json(options = nil)
    super(include: { tasks: { methods: :due_to_s } }).merge(options || {})
  end

end
