<script setup></script>

<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/" class="logo">
        <img src="/AAAlogo.png" alt="Apoorva Art Works Logo" class="h-12" />
      </router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  background-color: #111827; /* Changed to match HomeView's bg-gray-900 */
  color: #d1d5db; /* Changed to match HomeView's text-gray-300 */
}

.app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.navbar {
  width: 100%;
  background: linear-gradient(
    to bottom right,
    #d97706,
    #991b1b
  ); /* Changed to match HomeView's gradient */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #ffffff; /* Changed to white to match HomeView's text */
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #fcd34d; /* Changed to yellow-300 to match HomeView's color scheme */
}

@media (max-width: 640px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
