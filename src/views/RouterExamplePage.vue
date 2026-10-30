<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4"><i class="fas fa-route me-2 text-primary"></i>Примеры Vue Router</h2>
    
    <div class="row g-4">
      <!-- Динамические параметры -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0"><i class="fas fa-hashtag me-2"></i>Динамические параметры (:id)</h5>
          </div>
          <div class="card-body">
            <p class="text-muted">
              Маршруты с динамическими параметрами позволяют передавать данные через URL.
              Например, <code>/users/:id</code> — где <code>:id</code> может быть любым числом.
            </p>
            
            <div class="alert alert-light">
              <strong>Примеры маршрутов:</strong>
              <ul class="mb-0 mt-2">
                <li><code>/router-demo/users</code> — список пользователей</li>
                <li><code>/router-demo/users/1</code> — пользователь с ID=1</li>
                <li><code>/router-demo/users/5</code> — пользователь с ID=5</li>
              </ul>
            </div>

            <router-link to="/router-demo/users" class="btn btn-primary">
              <i class="fas fa-arrow-right me-1"></i>Перейти к демо
            </router-link>
          </div>
        </div>
      </div>

      <!-- Вложенные маршруты -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0"><i class="fas fa-layer-group me-2"></i>Вложенные маршруты (Nested)</h5>
          </div>
          <div class="card-body">
            <p class="text-muted">
              Вложенные маршруты позволяют создавать иерархическую структуру URL.
              Родительский компонент содержит <code>&lt;router-view&gt;</code> для отображения дочерних компонентов.
            </p>
            
            <div class="alert alert-light">
              <strong>Примеры маршрутов:</strong>
              <ul class="mb-0 mt-2">
                <li><code>/router-demo/nested</code> — обзор</li>
                <li><code>/router-demo/nested/profile</code> — профиль</li>
                <li><code>/router-demo/nested/settings</code> — настройки</li>
                <li><code>/router-demo/nested/activity</code> — активность</li>
              </ul>
            </div>

            <router-link to="/router-demo/nested" class="btn btn-success">
              <i class="fas fa-arrow-right me-1"></i>Перейти к демо
            </router-link>
          </div>
        </div>
      </div>

      <!-- Код примеров -->
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-dark text-white">
            <h5 class="mb-0"><i class="fas fa-code me-2"></i>Пример кода</h5>
          </div>
          <div class="card-body">
            <h6 class="fw-bold">Динамические параметры:</h6>
            <pre class="bg-light p-3 rounded"><code>// router/index.js
{
  path: '/router-demo/users',
  component: UsersListDemo
},
{
  path: '/router-demo/users/:id',
  component: UserDetailDemo
}

// UserDetailDemo.vue
computed: {
  userId() {
    return this.$route.params.id;
  }
}</code></pre>

            <h6 class="fw-bold mt-4">Вложенные маршруты:</h6>
            <pre class="bg-light p-3 rounded"><code>// router/index.js
{
  path: '/router-demo/nested',
  component: NestedRoutesDemo,
  children: [
    { path: '', component: Overview },
    { path: 'profile', component: Profile },
    { path: 'settings', component: Settings },
    { path: 'activity', component: Activity }
  ]
}

// NestedRoutesDemo.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Навигация --&gt;
    &lt;router-link to="/router-demo/nested"&gt;Обзор&lt;/router-link&gt;
    &lt;router-link to="/router-demo/nested/profile"&gt;Профиль&lt;/router-link&gt;
    
    &lt;!-- Место для дочерних компонентов --&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouterExamplePage'
}
</script>
