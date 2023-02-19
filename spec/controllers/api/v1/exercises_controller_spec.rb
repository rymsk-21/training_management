require 'rails_helper'

RSpec.describe Api::V1::ExercisesController, type: :controller do
  describe "GET #index" do
    before do
      exercise1 = FactoryBot.create(:exercise, name: 'name_1', category: 'category_1')
      exercise2 = FactoryBot.create(:exercise, name: 'name_2', category: 'category_2')
    end

    context "returns a successful response" do
      before { get :index }

      it { expect(response).to be_successful }
    end

    context "returns all exercises as JSON" do
      before { get :index }

      it "has the correct count" do
        response_body = JSON.parse(response.body)
        expect(response_body["exercise"].count).to eq(2)
      end

      it "has the correct first exercise" do
        response_body = JSON.parse(response.body)
        expect(response_body["exercise"][0]["name"]).to eq("name_1")
        expect(response_body["exercise"][0]["category"]).to eq("category_1")
      end

      it "has the correct second exercise" do
        response_body = JSON.parse(response.body)
        expect(response_body["exercise"][1]["name"]).to eq("name_2")
        expect(response_body["exercise"][1]["category"]).to eq("category_2")
      end
    end
  end
end
