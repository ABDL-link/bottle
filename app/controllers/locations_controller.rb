# frozen_string_literal: true

class LocationsController < ApplicationController
  layout 'public'

  attr_reader :accounts
  helper_method :accounts
  before_action :authenticate_user!

  def index
    @searched = params[:search][:location] if params[:search]
    if @searched.present?
      locations = Geocoder.search(params[:search][:location])
      if locations.first
        @location = locations.first.coordinates
      end
    elsif current_account.location_valid?
      @location = current_account
    end

    render :index
  end

  def accounts
    @accounts ||= if @location
      Account.location_shown.near(@location, 10000).order('distance').page(params[:page]).per(40)
    else
      Account.location_shown.page(params[:page]).per(40)
    end
  end

end
