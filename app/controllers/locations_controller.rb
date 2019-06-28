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
    @accounts ||= if params[:search] && params[:search][:location]
      locations = Geocoder.search(params[:search][:location])
      if locations.first
        Account.location_shown.near(locations.first.coordinates, 10000).order('distance').page(params[:page]).per(40)
      else
        Account.none.page(params[:page])
      end
    elsif current_account.location_valid?
      Account.location_shown.near(current_account, 10000).order('distance').page(params[:page]).per(40)
    else
      Account.location_shown.page(params[:page]).per(40)
    end
  end

end
