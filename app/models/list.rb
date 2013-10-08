class List < ActiveRecord::Base
  attr_accessible :archived, :completed, :label, :title, :user

  # Relationships
  belongs_to :user
  has_many :tasks

  # Validations
  validates :title, :user, presence: true

  # Customise as_json
  def as_json(options = nil)
    super(include: :tasks).merge(options || {})
  end

end
