class AddDistanceUnitsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :distance_units, :string, default: 'mi'
  end
end
