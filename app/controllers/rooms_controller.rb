# frozen_string_literal: true

class RoomsController < ApplicationController
  def show
    @messages = Message.includes(:user).order(:id)
    @new_message = current_user.messages.build
  end
end
