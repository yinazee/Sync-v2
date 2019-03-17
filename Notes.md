before_action :set_event, only: [:index, :show, :edit, :update, :destroy]
before_action :set_user, only: [:index, :create, :show, :edit, :update, :destroy]
# skip_before_action :set_host, only: [:test]
before_action :set_host, only: [:show, :edit]
