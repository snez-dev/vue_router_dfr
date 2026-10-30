<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4"><i class="fas fa-layer-group me-2 text-primary"></i>Вложенные маршруты (Nested Routes)</h2>
    
    <div class="alert alert-info">
      <i class="fas fa-info-circle me-2"></i>
      Этот раздел демонстрирует <strong>вложенные маршруты</strong>. Навигация между вкладками не перезагружает страницу.
    </div>

    <div class="row">
      <div class="col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-2">
            <div class="list-group list-group-flush">
              <router-link 
                to="/router-demo/nested" 
                class="list-group-item list-group-item-action"
                active-class="active"
                exact
              >
                <i class="fas fa-home me-2"></i>Обзор
              </router-link>
              <router-link 
                to="/router-demo/nested/profile" 
                class="list-group-item list-group-item-action"
                active-class="active"
              >
                <i class="fas fa-user me-2"></i>Профиль
              </router-link>
              <router-link 
                to="/router-demo/nested/settings" 
                class="list-group-item list-group-item-action"
                active-class="active"
              >
                <i class="fas fa-cog me-2"></i>Настройки
              </router-link>
              <router-link 
                to="/router-demo/nested/activity" 
                class="list-group-item list-group-item-action"
                active-class="active"
              >
                <i class="fas fa-history me-2"></i>Активность
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-9">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedRoutesDemo'
}
</script>
