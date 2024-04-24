<template>
    <NuxtLayout>
      <v-app>
        <!-- <VRow>
          <VCol lg="2" cols="12" xs="1">
            <Sidebar/>
          </VCol>
  
          <VCol lg="10" cols="12" xs="11">
            <RouterView/>
          </VCol>
        </VRow> -->
        <div style="position: relative">
          <Sidebar class="sidebar"/>
          <NuxtPage class="nuxt-page" />
        </div>
      </v-app>
    </NuxtLayout>
</template>

<script setup>
  import Sidebar from "./components/Sidebar.vue"

</script>

<style>
  .nuxt-page {
    position: absolute; 
    top: 0; 
    right: 0; 
    width: 84%; 
    z-index: 0;
  }
  .sidebar {
    position: absolute; 
    left: 0; 
    top: 0; 
    width: 15%; 
    z-index: 99; 
    background:#fff;
  }
  @media screen and (max-width: 420px) {
    .sidebar {
      width: 65%;
    }
    .nuxt-page {
      width: 76%;
    }
  }
   @media screen and (min-width: 421px) and (max-width: 576px) {
    .sidebar {
      width: 65%;
      /* min-width: 70px; */
    }
    .nuxt-page {
      width: 76%;
    }
  }

  @media screen and (min-width: 577px) and (max-width: 768px) {
      .sidebar {
        width: 45%;
        /* min-width: 70px; */
      }
      .nuxt-page {
        width: 85%;
      }
  }
</style>
  