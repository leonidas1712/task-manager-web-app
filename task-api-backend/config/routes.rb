Rails.application.routes.draw do
  # only allow GET, POST /categories and DELETE /categories/:id
  resources(:categories, except: [:show]) do
    # only POST /categories/:id/tasks
    resources :tasks, only: [:create]
  end

  # GET all tasks, DELETE or PATCH specific tasks
  resources :tasks, only: [:index, :destroy, :update]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
