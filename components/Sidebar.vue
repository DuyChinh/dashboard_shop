<template>
    <div class="navigation">
        <div
          :v-model="drawer"
          :rail="rail"
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="@/src/img/avatar.jpg"
            title="Duy Chinh"
            nav
          >
            <template v-slot:append>
              <v-btn
                v-if="!shrink"
                icon="mdi-chevron-double-left"
                variant="text"
                @click="handleChangeWidthNav"
              ></v-btn>
              <v-btn
                v-else
                icon="mdi-chevron-double-right"
                variant="text"
                @click="handleChangeWidthNav"
              ></v-btn>
            </template>
          </v-list-item>

          <v-list density="compact" nav>
            <v-list-item to="/dashboard"
              prepend-icon="mdi-home-city"
              title="Home"
              value="home"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account"
              title="My Account"
              value="account"
            ></v-list-item>
            <v-list-item to="/product/list"
              prepend-icon="mdi-cart"
              title="Product"
              value="product"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-group-outline"
              title="User"
              value="user"
            ></v-list-item>
          </v-list>
        </div>
        <!-- <v-main style="height: 100vh"></v-main> -->

  </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue"
  const drawer = ref(true)
  const shrink = ref(false)
  const rail = ref(false)
  const title = ref();
  onMounted(() => {
    title.value = localStorage.getItem("email")
  })

  const handleChangeWidthNav = () => {
    shrink.value = !shrink.value;
    if(shrink.value) {
      const navigationElement = document.querySelector('.navigation');
      navigationElement.classList.add('shrink');
    } else {
      const navigationElement = document.querySelector('.navigation');
      navigationElement.classList.remove('shrink');
    }
  }
</script>

<style>
  .navigation {
    min-width: 85px;
    padding-left: 10px;
    padding-top: 15px;
    height: 100vh;
    z-index: 100;
    box-shadow: 1px 1px 5px #ccc;
    transition: width 0.2s linear;
    box-sizing: border-box;
  }

  .navigation.shrink {
    box-sizing: border-box;
    width: 70px !important;
  }

</style>