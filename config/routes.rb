Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :exercises do
        resources :trainings, only: %i[index]
      end
      resources :line_menus, only: %i[index create]
      put 'line_menus/replace', to: 'line_menus#replace'
      resources :orders, only: %i[create]
    end
  end
end
