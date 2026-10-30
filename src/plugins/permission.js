import { useAuthStore } from '../stores/auth';

/**
 * Плагин управления правами доступа
 * 
 * Директивы:
 * - v-permission - показать/скрыть элемент по правам
 * - v-permission-disable - блокировать элемент
 * 
 * Глобальные методы:
 * - $can(permission) - проверка права
 * - $canAny(permissions) - есть ли хоть одно право
 * - $canAll(permissions) - есть ли все права
 */
export const PermissionPlugin = {
  install(app) {
    const authStore = useAuthStore();

    // v-permission directive
    app.directive('permission', {
      mounted(el, binding) {
        checkPermission(el, binding, authStore);
      },
      updated(el, binding) {
        checkPermission(el, binding, authStore);
      }
    });

    // v-permission-disable directive
    app.directive('permission-disable', {
      mounted(el, binding) {
        checkDisable(el, binding, authStore);
      },
      updated(el, binding) {
        checkDisable(el, binding, authStore);
      }
    });

    // Global methods
    app.config.globalProperties.$can = function (permission) {
      return authStore.hasPermission(permission);
    };

    app.config.globalProperties.$canAny = function (permissions) {
      return authStore.hasAnyPermission(permissions);
    };

    app.config.globalProperties.$canAll = function (permissions) {
      return authStore.hasAllPermissions(permissions);
    };
  }
};

function parseBinding(binding) {
  const value = binding.value;
  if (typeof value === 'string') return { type: 'any', permissions: [value] };
  if (Array.isArray(value)) return { type: 'any', permissions: value };
  if (typeof value === 'object' && value !== null) {
    if (value.all) return { type: 'all', permissions: Array.isArray(value.all) ? value.all : [value.all] };
    if (value.any) return { type: 'any', permissions: Array.isArray(value.any) ? value.any : [value.any] };
  }
  return { type: 'any', permissions: [] };
}

function hasRequiredPermission(parsed, authStore) {
  if (parsed.type === 'all') return authStore.hasAllPermissions(parsed.permissions);
  return authStore.hasAnyPermission(parsed.permissions);
}

function checkPermission(el, binding, store) {
  const parsed = parseBinding(binding);
  const hasPerm = hasRequiredPermission(parsed, store);
  if (binding.modifiers.remove) {
    if (!hasPerm && el.parentNode) el.parentNode.removeChild(el);
  } else {
    el.style.display = hasPerm ? '' : 'none';
  }
}

function checkDisable(el, binding, store) {
  const parsed = parseBinding(binding);
  const hasPerm = hasRequiredPermission(parsed, store);
  el.disabled = !hasPerm;
  if (!hasPerm) {
    el.classList.add('disabled');
    el.setAttribute('title', 'Недостаточно прав');
    el.style.opacity = '0.5';
    el.style.cursor = 'not-allowed';
  } else {
    el.classList.remove('disabled');
    el.removeAttribute('title');
    el.style.opacity = '';
    el.style.cursor = '';
  }
}
