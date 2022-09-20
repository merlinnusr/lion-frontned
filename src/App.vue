<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">

    <router-link class="navbar-brand" to="/">Reservaciones</router-link>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Salas de juntas</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/book-meeting-room-list">Salas reservadas</router-link>
        </li>

      </ul>
    </div>

  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style>

</style>
