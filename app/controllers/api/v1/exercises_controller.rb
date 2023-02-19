module Api
  module V1
    class ExercisesController < ApplicationController
      def index
        exercises = Exercise.all

        render json: {
          exercise: exercises
        }, status: :ok
      end
    end
  end
end