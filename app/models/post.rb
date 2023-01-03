class Post < ApplicationRecord
    serialize :tags, Array
end
