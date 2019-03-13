class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :guests

  has_many :guests
end
