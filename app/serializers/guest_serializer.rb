class GuestSerializer < ActiveModel::Serializer
  attributes :id, :user

  belongs_to :user
  has_many :event_guests
  has_many :events, through: :event_guests
end
