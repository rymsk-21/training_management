module Api
  module V1
    class TrainingsController < ApplicationController
      def index
        exercise = Exercise.find(params[:exercise_id])
        trainings = exercise.trainings

        render json: {
          trainings: trainings
        },status: :ok
      end
    end
  end
end