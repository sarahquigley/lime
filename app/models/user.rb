class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :fullname, :email, :password, :password_confirmation, :remember_me

  # Relationships
  has_many :lists, dependent: :destroy, inverse_of: :user
  has_many :tasks, through: :lists
  has_many :notes, through: :lists
  has_many :tags, dependent: :destroy, inverse_of: :user

  def as_json(options = nil)
    super(include: [ :lists , :tags, { tasks: { include: :tags } } ]).merge(options || {})
  end

end
