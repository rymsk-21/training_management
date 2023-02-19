module Api
  module V1
    class TrainingsController < ApplicationController
      # トレーニングの一覧を取得する
      def index
        # トレーニングに紐づくエクササイズを取得する
        exercise = Exercise.find(params[:exercise_id])
        # エクササイズに紐づくトレーニングを取得する
        trainings = exercise.trainings

        # トレーニング情報をJSON形式でレスポンスする
        render json: {
          trainings: trainings
        },status: :ok
      end
    end
  end
end