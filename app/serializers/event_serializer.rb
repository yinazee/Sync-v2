class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :host, :description, :created_at
  belongs_to :host
  has_many :event_guests
  has_many :guests, through: :event_guests
end