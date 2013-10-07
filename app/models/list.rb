class List < ActiveRecord::Base
  attr_accessible :archived, :completed, :label, :title
end
