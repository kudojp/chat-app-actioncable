# frozen_string_literal: true

class RoomChannel < ApplicationCable::Channel
  def subscribed
    # このチャネルから配信
    stream_from 'room_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
