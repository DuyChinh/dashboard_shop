<script setup>
    import axios from 'axios';
    import { ref, onMounted } from "vue"

    const products = ref()
    const totalProducts = ref(0)
    const infoProducts = ref()
    let productData;
    const headers = [
        {
            title: 'Id',
            value: 'id',
        },
        {
            title: 'Image',
            value: 'src'
        },
        {
            title: 'Product name',
            value: 'title'
        },
        {
            title: 'Price',
            value: 'price'
        },
        {
            title: 'Limit',
            value: 'limit'
        },
        {
            title: 'Actions',
            value: 'actions'
        }
    ]

    const options = ref({
        page: 1,
        itemsPerPage: 5,
        sortBy: [],
        groupBy: [],
        search: undefined,
    })

    const getProducts = async() => {
        const res = await axios.get('https://apishopdc.vercel.app/products')
        .then((res) => {
            productData = res.data.data;
            infoProducts.value = productData;
        })
        .catch((e) => {
            console.log(e);
        })
    }

    onMounted(() => {
        getProducts();
    });

    const fetchProducts = () => {
        const limitItems = options.value.itemsPerPage;
        const page = options.value.page;
        const startPage = (page-1)*limitItems;
        const endPage = page*limitItems;
        if(infoProducts.value) {
            products.value = infoProducts.value.filter((user, index) => index >= startPage && index < endPage);
        }
    }
    watchEffect(fetchProducts)

    //update totalProducts
    watch(infoProducts , () => {
    if(infoProducts .value) {
        totalProducts.value = infoProducts .value.length;
        if(totalProducts.value <= options.value.itemsPerPage) {
            options.value.page = 1;
        }
    }
    });
</script>

<template>
    <section class="section">
        <VCard
            title="Search Filters"
            class="mx-6 my-6"
        >
            <v-data-table-server class="border-sm"
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :headers="headers"
            :items="products"
            :items-length="totalProducts"
            >
                <!-- Image -->
                <template #item.src="{ item }">
                    <img class="product-img" :src="item.src"/>
                </template>

                <!-- Product Name -->
                <template #item.title="{ item }">
                    <NuxtLink
                        :to="`/product/view/${item.id}`" 
                        class=" text-decoration-none text-black product-name"
                        >
                        {{ item.title }}
                    </NuxtLink>
                </template>

                <!-- Actions -->
                <template #item.actions="{ item }">
                    <VBtn
                        icon
                        variant="text"
                        size="small"
                        color="medium-emphasis"
                    >
                        <VIcon
                            size="24"
                            icon="mdi-dots-vertical"
                        />

                        <VMenu activator="parent">
                            <VList>
                                <VListItem >
                                <template #prepend>
                                    <VIcon icon="mdi-eye-outline" />
                                </template>
                                <VListItemTitle>View</VListItemTitle>
                                </VListItem>
                                <VListItem link @click="handleEditProduct(item)">
                                    <template #prepend>
                                        <VIcon icon="mdi-pencil-outline" />
                                    </template>
                                    <VListItemTitle>Edit</VListItemTitle>
                                </VListItem>
                                <VListItem @click="handleDeleteProduct(item)">
                                <template #prepend>
                                    <VIcon icon="mdi-delete-outline" />
                                </template>
                                    <VListItemTitle>Delete</VListItemTitle>
                                </VListItem>
                            </VList>
                        </VMenu>
                    </VBtn>
                </template>
            </v-data-table-server>
        </VCard>
    </section>

</template>


<style>
    .section {
        padding-top: 40px;
        /* background: #f7f7f9; */
    }

    .product-img {
        margin: 8px 0;
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: contain;
    }
    .product-name {
        font-weight: 600;
    }

    .product-name:hover {
        opacity: 0.8;
    }
</style>