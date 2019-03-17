class EventSerializer < ActiveModel::Serializer
  # attributes :id, :name, :description, :guests
  attributes :id, :name, :description

  # has_many :guests
  has_many :event_guests
  has_many :guests, through: :event_guests
end
