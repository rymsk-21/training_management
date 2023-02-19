module Api
  module V1
    class OrderController < ApplicationController
      def create
        posted_line_menus = LineMenu.where(id: params[:line_menu_ids])
        order = Order.new(
          total_calorie: total_calorie(posted_line_menus),
        )
        if order.save_with_update_line_menus!(posted_line_menus)
          render json: {}, status: :no_content
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def total_calorie(posted_line_menus)
        # 怪しいかも
        posted_line_menus.sum {|line_menu| line_menu.total_reps}
      end
    end
  end
end