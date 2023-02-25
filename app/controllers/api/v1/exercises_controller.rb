module Api
  module V1
    class ExercisesController < ApplicationController
      # トレーニング一覧を取得する
      def index
        # 全てのトレーニングを取得
        exercises = Exercise.all

        # 取得したトレーニングをJSON形式でレスポンスとして返す
        render json: {
          exercises: exercises
        }, status: :ok
      end
    end
  end
end