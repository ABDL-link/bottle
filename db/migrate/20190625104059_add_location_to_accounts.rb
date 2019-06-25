class AddLocationToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :location, :string
    add_column :accounts, :location_coordinates, :string
    add_column :accounts, :location_enabled, :boolean
  end
end
