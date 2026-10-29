/**
 * Плагин управления правами доступа (Permission Plugin)
 * 
 * Директивы:
 * - v-permission - показать/скрыть элемент по правам
 * - v-permission-disable - блокировать элемент
 * - v-permission-class - добавить CSS класс
 * 
 * Глобальные методы:
 * - $can(permission) - проверка права
 * - $canAny(permissions) - есть ли хоть одно право
 * - $canAll(permissions) - есть ли все права
 */
(function () {
  const PermissionPlugin = {
    install(app, options = {}) {
      const store = options.store || window.AppStore;

      // v-permission directive
      app.directive('permission', {
        mounted(el, binding) { checkPermission(el, binding, store); },
        updated(el, binding) { checkPermission(el, binding, store); }
      });

      // v-permission-disable directive
      app.directive('permission-disable', {
        mounted(el, binding) { checkDisable(el, binding, store); },
        updated(el, binding) { checkDisable(el, binding, store); }
      });

      // v-permission-class directive
      app.directive('permission-class', {
        mounted(el, binding) { checkClass(el, binding, store); },
        updated(el, binding) { checkClass(el, binding, store); }
      });

      // Global methods
      app.config.globalProperties.$can = function (permission) {
        return store.actions.hasPermission(permission);
      };
      app.config.globalProperties.$canAny = function (permissions) {
        return store.actions.hasAnyPermission(permissions);
      };
      app.config.globalProperties.$canAll = function (permissions) {
        return store.actions.hasAllPermissions(permissions);
      };
      app.config.globalProperties.$permissions = store.getters.userPermissions;
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

  function hasRequiredPermission(parsed, store) {
    if (parsed.type === 'all') return store.actions.hasAllPermissions(parsed.permissions);
    return store.actions.hasAnyPermission(parsed.permissions);
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

  function checkClass(el, binding, store) {
    const value = binding.value;
    if (!value || !value.permission || !value.class) return;
    const hasPerm = store.actions.hasPermission(value.permission);
    if (!hasPerm) el.classList.add(value.class);
    else el.classList.remove(value.class);
  }

  window.PermissionPlugin = PermissionPlugin;
})();
