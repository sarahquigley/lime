class Task < ActiveRecord::Base
  attr_accessible :archived, :completed, :description, :due, :list_id, :list_position, :priority, :title
end
