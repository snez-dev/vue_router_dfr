<template>
  <div>
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Настройки профиля</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveSettings">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Имя</label>
              <input type="text" class="form-control" v-model="form.full_name">
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="form.email">
            </div>
            <div class="col-12">
              <label class="form-label">Телефон</label>
              <input type="tel" class="form-control" v-model="form.phone" placeholder="+7 (999) 123-45-67">
            </div>
            <div class="col-12">
              <label class="form-label">О себе</label>
              <textarea class="form-control" rows="3" v-model="form.bio" placeholder="Расскажите о себе..."></textarea>
            </div>
          </div>
          <div class="mt-4">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-save me-2"></i>Сохранить изменения
            </button>
          </div>
        </form>

        <div class="mt-4">
          <div class="alert alert-success mb-0">
            <i class="fas fa-info-circle me-2"></i>
            Это пример <strong>вложенного маршрута</strong>. Текущий путь: 
            <code>{{ $route.fullPath }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../../store';

export default {
  name: 'ProfileSettings',
  data() {
    return {
      form: {
        full_name: '',
        email: '',
        phone: '',
        bio: ''
      }
    };
  },
  mounted() {
    const store = useStore();
    const user = store.getters.currentUser.value || {};
    this.form.full_name = user.full_name || '';
    this.form.email = user.email || '';
  },
  methods: {
    saveSettings() {
      alert('Настройки сохранены (демо)');
    }
  }
}
</script>
