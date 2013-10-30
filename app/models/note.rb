class Note < ActiveRecord::Base
  attr_accessible :body, :task

  # Associations
  belongs_to :task, inverse_of: :notes

  #Validations
  validates :body, :task, presence: true

end
