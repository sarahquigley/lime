class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list_id, :list_position, :priority, :title

  # Relationships
  belongs_to :list
  belongs_to :user, through: :list

  # Validations
  validates :presence, :archived, :completed, :list_id, :list_position, :title

end
