# frozen_string_literal: true

class LocationsController < ApplicationController
  layout 'public'

  before_action :authenticate_user!
  before_action :set_accounts

  def index
    render :index
  end

  private

  def set_accounts
    if current_account.location_valid?
      @accounts = Account.location_shown.near(current_account, 10000).order('distance')
    else
      @accounts = Account.location_shown
    end
  end

end
