# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'rooms#show'

  resource :messages, only: :create
end
