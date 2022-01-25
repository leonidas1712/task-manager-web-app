class AddDateToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :due_date, :datetime
  end
end
