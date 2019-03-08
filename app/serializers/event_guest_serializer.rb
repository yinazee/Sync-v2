class EventGuestSerializer < ActiveModel::Serializer
  belongs_to :event
  belongs_to :guest

  # scope :rsvp, -> { where(rsvp: true) }


  end
