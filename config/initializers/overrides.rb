require Rails.root.join('lib/overrides/hoptoad_notifier/hoptoad_notifier')

class BSON::ObjectId
  def as_json(*_args)
    to_s
  end
end

Moped::BSON::ObjectId.class_eval do
  def as_json(*_args)
    to_s
  end

  def bson_type
    ::String::BSON_TYPE
  end

  def to_bson
    to_s.to_bson
  end
end
