class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]
  before_action :set_category, only: [:index, :create]

  # GET /tasks - if @category exists, render only category's tasks. Else, all tasks.
  def index
    if @category 
      render json: @category.tasks
    else 
      render json: Task.all
    end
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks (/categories/:id/tasks)
  # POST to root/tasks route does not exist, so request must come through /categories/:id
  def create    
    @task = @category.tasks.build(task_params)

    if @task.save
      # location: @task usually last param, but we don't need any redirect
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
    render json: @task
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Set category of a task in instance variable. @category might be nil, but only for [:index,]
    # because of routes.rb. So we can safely use @category in other routes.
    def set_category
      id = params[:category_id]

      if id 
        @category = Category.find(id)
      end
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:name, :description, :due_date, :priority, :category_id)
    end
end
