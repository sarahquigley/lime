class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list, :list_position, :priority, :title

  # Relationships
  belongs_to :list

  # Validations
  validates :list, :list_position, :title, presence: true

end
