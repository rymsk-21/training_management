Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :exercises do
        resources :trainings, only: %i[index]
      end
      resources :users, only: %i[index create]
    end
  end
end
