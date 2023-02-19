3.times do |n|
  exercise = Exercise.new(
    name: "testエクササイズ_#{n}",
    category: '全身',
    time_required: 10,
    )

  12.times do |m|
    exercise.trainings.build(
      name: "筋トレ名_#{m}",
      calorie: 50,
      description: "筋トレ名_#{m}の説明文です。"
    )
  end

  exercise.save!
end