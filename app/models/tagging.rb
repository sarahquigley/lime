class Tagging < ActiveRecord::Base
  attr_accessible :tag, :task

  # Relationships
  belongs_to :task, inverse_of: :taggings 
  belongs_to :tag, inverse_of: :taggings

  # Validations
  validates :tag, :task, presence: true
end
