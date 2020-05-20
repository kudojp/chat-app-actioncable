# frozen_string_literal: true

class MessagesController < ApplicationController
  def create
    @message = current_user.messages.create!(message_params)

    # 投稿されたメッセージをチャット参加者に配信
    ActionCable.server.broadcast 'room_channel', message: @message.template
  end

  def additional_index
    last_id = params[:oldest_message_id].to_i - 1
    puts last_id
    @messages = Message.includes(:user).order(:id).where(id: 1..last_id).last(50)
    @messages.tap { |m| puts m.map(&:id) }
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
