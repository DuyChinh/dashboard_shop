<script setup>
    import axios from 'axios';
    const product = ref();
    const route = useRoute()
    const id = route.params.id;
    const apiKey = process.env.NUXT_BASE_URL;
    const getProduct = async() => {
        await axios.get(`https://apishopdc.vercel.app/products/${id}`)
        .then((res) => {
            product.value = res.data.data;
        })
        .catch((e) => {
            console.log(e);
        })
    }
    getProduct();
</script>

<template>
    <div>
        <v-container class="pa-3">
            <v-row>
                <v-col cols="12" md="6" lg="6">
                    <v-card>
                        <v-card-title>
                            Product Detail
                        </v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item>
                                    <span class="font-weight-bold">Product name: </span><span class="text-medium-emphasis">{{ product?.title }}</span> 
                                </v-list-item>

                                <v-list-item>
                                    <span class="font-weight-bold">Product price: </span><span class="text-medium-emphasis">{{ product?.price.toLocaleString("en-US", {style:"currency", currency:"VND"}) }}</span> 
                                </v-list-item>

                                <v-list-item>
                                    <span class="font-weight-bold">Product limit: </span><span class="text-medium-emphasis">{{ product?.limit }}</span> 
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                    <v-img class="rounded-lg" :src="product?.src"></v-img>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>



<style lang="scss" scoped>

</style>