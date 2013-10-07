class List < ActiveRecord::Base
  attr_accessible :archived, :completed, :label, :title, :user_id

  # Relationships
  belongs_to :user
  has_many :tasks

  # Validations
  validates :presence, :archived, :completed, :title, :user_id

end
