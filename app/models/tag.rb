class Tag < ActiveRecord::Base
  attr_accessible :name, :user

  # Relationships
  belongs_to :user
  has_many :taggings, inverse_of: :tag
  has_many :tasks, through: :taggings

  # Validations
  validates :name, presence: true

end
