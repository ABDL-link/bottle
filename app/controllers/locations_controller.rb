# frozen_string_literal: true

class LocationsController < ApplicationController
  layout 'public'

  attr_reader :accounts
  helper_method :accounts
  before_action :authenticate_user!

  def index
    @searched = params[:q][:location] if params[:q]
    if @searched.present?
      locations = Geocoder.search(params[:q][:location])
      if locations.first
        @location = locations.first.coordinates
      else
        @searched = false
      end
    elsif current_account.location_valid?
      @location = current_account
    end

    render :index
  end

  def accounts
    @accounts ||= if @location
      Account.location_shown.near(@location, 10000).order('distance').page(params[:page]).per(20)
    else
      Account.location_shown.page(params[:page]).per(20)
    end
  end

end
