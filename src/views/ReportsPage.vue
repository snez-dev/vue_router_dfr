<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold mb-0"><i class="fas fa-chart-bar me-2 text-primary"></i>Отчёты</h2>
      <button class="btn btn-primary" v-permission="'reports.create'"><i class="fas fa-plus me-1"></i>Создать</button>
    </div>
    <div class="row g-4">
      <div class="col-md-4" v-for="report in reports" :key="report.id">
        <div class="card border-0 shadow-sm card-hover h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <i class="fas fa-file-alt fa-2x text-primary"></i>
              <span class="badge" :class="statusBadge(report.status)">{{ statusText(report.status) }}</span>
            </div>
            <h5>{{ report.title }}</h5>
            <p class="text-muted small"><i class="fas fa-calendar me-1"></i>{{ report.date }}</p>
          </div>
          <div class="card-footer bg-white border-0 pt-0">
            <button class="btn btn-sm btn-outline-primary me-1" v-permission="'reports.view'"><i class="fas fa-eye me-1"></i>Просмотр</button>
            <button class="btn btn-sm btn-outline-success" v-permission="'reports.download'"><i class="fas fa-download me-1"></i>Скачать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'ReportsPage',
  data() {
    return { reports: [] };
  },
  async mounted() {
    const store = useStore();
    this.reports = await store.mockApi.getReports();
  },
  methods: {
    statusBadge(s) {
      return { completed: 'bg-success', in_progress: 'bg-warning text-dark', pending: 'bg-secondary' }[s];
    },
    statusText(s) {
      return { completed: 'Завершён', in_progress: 'В процессе', pending: 'Ожидание' }[s];
    }
  }
}
</script>
