class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :description

  has_many :guests
  has_many :event_guests
  has_many :guests, through: :event_guests
end
