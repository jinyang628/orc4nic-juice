json.extract! post, :id, :title, :body, :created_at, :updated_at, :username
json.url post_url(post, format: :json)
