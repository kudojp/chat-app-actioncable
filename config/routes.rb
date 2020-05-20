# frozen_string_literal: true

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'rooms#show'

  resource :messages, only: :create
  get '/additional_messages', to: 'messages#additional_index'
end
