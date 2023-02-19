module Api
  module V1
    class LineMenusController < ApplicationController
      before_action :set_menu, only: %i[create replace]

      # 一覧
      def index
        # アクティブなLineMenuを取得
        line_menus = LineMenu.active
        # 取得したLineMenuが存在する場合
        if line_menus.exists?
          # LineMenuのIDを格納した配列、最初のLineMenuのエクササイズ、レップ数の合計、合計レップをレスポンスとして返す
          render json: {
            line_menu_ids: line_menus.map { |line_menu| line_menu.id },
            exercise: line_menus[0].exercise,
            rep: line_menus.sum { |line_menu| line_menu[:rep] },
            reps: line_menus.sum { |line_menu| line_menu.total_reps },
          }, status: :ok
        # 取得したLineMenuが存在しない場合
        else
          # 空のJSONを返す
          render json: {}, status: :no_content
        end
      end

      def create
        # 既に有効なLineMenuが他のエクササイズとして存在する場合は、通知不可能なステータスを返す
        if LineMenu.active.other_exercise(@ordered_menu.exercise_id).present?
          return render json: {
            existing_exercise: LineMenu.other_exercise(@ordered_menu.exercise.id).first.exercise.name,
            new_exercise: Training.find(params[:training_id]).exercise.name,
          }, status: :not_acceptable
        end

        # LineMenuをセットする
        set_line_menu(@ordered_menu)

        #LineMenuを保存できた場合は、作成されたステータスを返す
        if @line_menu.save
          render json: {
            line_menu: @line_menu,
          }, status: :created
        else
          # LienMenuを保存できなかった場合は、内部サーバーエラーを返す
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        # LineMenuのactiveなもので、現在のトレーニングとは異なるエクササイズを持っているものを探し、それらのactiveをfalseにする
        LineMenu.active.other_exercise(@ordered_menu.exercise.id).each do |line_menu|
          line_menu.update_attribute(:active, false)
        end

        # 新しいline_menuを作成し、保存する
        set_line_menu(@ordered_menu)

        # 保存に成功した場合、line_menuをレスポンスとして返す
        if @line_menu.save
          render json: {
            line_menu: @line_menu
          }, status: :created
        else
          # 保存に失敗した場合、内部エラーを返す
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_menu
        # params[:training_id]からトレーニングを検索し、@ordered_menuに格納する
        @ordered_menu = Training.find(params[:training_id])
      end

      def set_line_menu(ordered_menu)
        # ordered_menuに紐づくLineMenuが存在する場合は、LineMenuを取得し、repを加算、activeをtrueに更新する
        if ordered_menu.line_menus.present?
          @line_menu = ordered_menu.line_menu
          @line_menu.attributes = {
            rep: ordered_menu.line_menu.rep + params[:rep],
            active: true
          }
        else
          # LineMenuが存在しない場合、新しいLineMenuをordered_menuに紐付けて作成する
          @line_menu = ordered_menu.build_line_menu(
            rep: params[:rep],
            exercise: ordered_menu.exercise,
            active: true
          )
        end
      end
    end
  end
end