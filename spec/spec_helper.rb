# spec/spec_helper.rb
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
require 'rspec/rails'
require 'database_cleaner'

# specディレクトリ以下の全てのファイルを読み込む
Dir[Rails.root.join('spec', '**', '*_spec.rb')].each { |f| require f }

# RSpecの設定を行う
RSpec.configure do |config|
  # 事前にデータベースをリセットする
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, type: :feature) do
    # featureスペックの場合、JavaScriptのドライバを使用する
    driven_by :selenium_chrome_headless
  end

  config.before(:each, type: :system) do
    # systemスペックの場合、JavaScriptのドライバを使用する
    driven_by :selenium_chrome_headless
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
