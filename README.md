# Vue 3 + TypeScript + Tailwind Startup App

This is a simple startup application built with Vue 3, TypeScript, and Tailwind CSS, featuring a login page and home page.

## 📁 Folder Structure Explained

```
vue-master/
├── public/                  # Static assets (like React's public folder)
├── src/
│   ├── components/          # Reusable components (like React components)
│   ├── views/              # Page components (like React pages/routes)
│   │   ├── Login.vue
│   │   └── Home.vue
│   ├── stores/             # Pinia stores (like Redux slices/Context)
│   │   └── auth.ts
│   ├── router/             # Vue Router configuration
│   │   └── index.ts
│   ├── App.vue            # Root component (like App.jsx in React)
│   ├── main.ts            # Entry point (like index.js in React)
│   ├── style.css          # Global styles
│   └── vite-env.d.ts      # TypeScript declarations
├── index.html             # HTML template (different from React - no build needed)
├── package.json
├── vite.config.ts         # Build configuration (like webpack.config.js)
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## 🔄 Vue vs React: Key Differences

### 1. **File Structure**

- **Vue**: Single File Components (`.vue`) combine template, script, and styles
- **React**: Separate files for JSX and CSS, or CSS-in-JS

### 2. **Component Syntax**

- **Vue**: Template-based with directives (`v-if`, `v-for`, `v-model`)
- **React**: JSX with JavaScript expressions

### 3. **State Management**

- **Vue**: Pinia (simpler than Redux, built-in reactivity)
- **React**: Redux, Context API, or custom hooks

### 4. **Reactivity**

- **Vue**: Built-in reactivity system with `ref()` and `reactive()`
- **React**: Manual re-renders with `useState()` and `useEffect()`

### 5. **Two-way Binding**

- **Vue**: `v-model` for automatic two-way binding
- **React**: Manual controlled components with value and onChange

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Login credentials:**
   - Email: `admin@example.com`
   - Password: `password`

## 📝 Vue Syntax Guide for React Developers

### Data Binding

```vue
<!-- Vue -->
<template>
  <input v-model="message" />
  <p>{{ message }}</p>
</template>

<!-- React equivalent -->
<input value="{message}" onChange="{e" ="" />
```

### Event Handling

```vue
<!-- Vue -->
<button @click="handleClick">Click me</button>

<!-- React equivalent -->
<button onClick="{handleClick}">Click me</button>
```

### Conditional Rendering

```vue
<!-- Vue -->
<div v-if="isVisible">Visible content</div>
<div v-else>Hidden content</div>

<!-- React equivalent -->
{isVisible ?
<div>Visible content</div>
:
<div>Hidden content</div>
}
```

### List Rendering

```vue
<!-- Vue -->
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>

<!-- React equivalent -->
{items.map(item => (
<li key="{item.id}">{item.name}</li>
))}
```

### Component State

```vue
<!-- Vue Composition API -->
<script setup>
import { ref, computed } from "vue";

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

const increment = () => count.value++;
</script>

<!-- React equivalent -->
const [count, setCount] = useState(0) const doubleCount = useMemo(() => count *
2, [count]) const increment = () => setCount(c => c + 1)
```

## 🧠 Interactive Modules Covered

Our application covers essential development patterns with side-by-side interactive demos matching React behavior alongside Vue options & composition API:

1. **Local State (`useState` vs `ref/reactive`)**
2. **Global State Management (`Zustand` vs `Pinia`)**
3. **Side Effects & Lifecycles (`useEffect` vs `watch/watchEffect`)**
4. **Performance Optimization (`useMemo/useCallback` vs `computed`)**
5. **Form Validation (React Hook Form + Zod vs Vue Form + Zod)**
6. **Data Fetching (React Query vs TanStack Vue Query)**
7. **HTTP Clients (Axios/Fetch vs VueUse `useFetch`)**
8. **List Mapping (JSX `.map()` vs Template `v-for`)**
9. **Event Handlers (Synthetic Events `onClick` vs `@click` with Modifiers)**
10. **Advanced Vue Features (`KeepAlive`, `Transition`, `v-memo`, and Scoped Slots)**

## 🏗️ Project Structure Decisions

### Why This Structure?

1. **`views/`** - Page-level components (like React's pages or screens)
2. **`stores/`** - Centralized state management with Pinia
3. **`router/`** - Route configuration and navigation guards
4. **Single File Components** - Template, script, and styles in one file

### Scaling Recommendations

- Add `components/` for reusable UI components
- Add `composables/` for shared logic (like React custom hooks)
- Add `utils/` for helper functions
- Add `types/` for TypeScript type definitions

## 🎯 Next Steps

1. Add more components in `src/components/`
2. Create more pages in `src/views/`
3. Add API integration with composables
4. Implement proper error handling
5. Add unit tests with Vitest
6. Configure ESLint and Prettier

## 📚 Key Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia State Management](https://pinia.vuejs.org/)
- [Vite Build Tool](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
