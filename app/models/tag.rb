class Tag < ActiveRecord::Base
  attr_accessible :name, :user

  # Relationships
  belongs_to :user, inverse_of: :tags
  has_many :taggings, dependent: :destroy, inverse_of: :tag
  has_many :tasks, through: :taggings

  # Validations
  validates :name, presence: true, uniqueness: true

end
