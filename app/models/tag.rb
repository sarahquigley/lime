class Tag < ActiveRecord::Base
  attr_accessible :name

  # Relationships
  has_many :taggings, inverse_of: :tag
  has_many :tasks, through: :taggings

  # Validations
  validates :name, presence: true

end
