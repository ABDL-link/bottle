# frozen_string_literal: true

class LocationsController < ApplicationController
  layout 'public'

  attr_reader :accounts
  helper_method :accounts
  before_action :authenticate_user!

  def index
    render :index
  end

  def accounts
    @accounts ||= if current_account.location_valid?
      Account.location_shown.near(current_account, 10000).order('distance').page(params[:page]).per(40)
    else
      Account.location_shown.page(params[:page]).per(40)
    end
  end
end
