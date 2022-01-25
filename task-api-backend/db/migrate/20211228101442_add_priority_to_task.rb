class AddPriorityToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :priority, :string
  end
end
