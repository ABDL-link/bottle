class AddLatLonToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :latitude, :float
    add_column :accounts, :longitude, :float
  end
end
