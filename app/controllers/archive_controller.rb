# frozen_string_literal: true

class ArchiveController < ApplicationController
  layout 'public'

  attr_reader :accounts
  helper_method :accounts
  before_action :authenticate_user!

  def index
    render :index
  end
end
