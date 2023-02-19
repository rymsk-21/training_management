require 'rails_helper'

RSpec.describe Api::V1::TrainingsController, type: :controller do
  describe "GET #index" do
    let(:exercise) { FactoryBot.create(:exercise) }
    let!(:training1) { FactoryBot.create(:training, exercise: exercise, name: 'name_1', calorie: 100, description: '説明') }
    let!(:training2) { FactoryBot.create(:training, exercise: exercise, name: 'name_2', calorie: 200, description: '説明') }

    before { get :index, params: { exercise_id: exercise.id } }

    context "returns a successful response" do
      it { expect(response).to be_successful }
    end

    context "returns all trainings as JSON" do
      it "has the correct count" do
        response_body = JSON.parse(response.body)
        expect(response_body["trainings"].count).to eq(2)
      end

      it "has the correct first training" do
        response_body = JSON.parse(response.body)
        expect(response_body["trainings"][0]["name"]).to eq("name_1")
        expect(response_body["trainings"][0]["calorie"]).to eq(100)
        expect(response_body["trainings"][0]["description"]).to eq("説明")
      end

      it "has the correct second training" do
        response_body = JSON.parse(response.body)
        expect(response_body["trainings"][1]["name"]).to eq("name_2")
        expect(response_body["trainings"][1]["calorie"]).to eq(200)
        expect(response_body["trainings"][1]["description"]).to eq("説明")
      end
    end
  end
end

