# frozen_string_literal: true

class RoomsController < ApplicationController
  def show
    @messages = Message.includes(:user).order(:id).last(100)
    @new_message = current_user.messages.build
  end
end
