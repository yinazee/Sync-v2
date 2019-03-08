class UserSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_one :host
  has_one :guest
end
