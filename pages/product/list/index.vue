
<script setup>
    import axios from 'axios';
    import { ref, onMounted } from "vue"
    // import DeleteDialog from "@components/dialogs/DeleteDialog"
    import DeleteDialog from "@/components/dialogs/DeleteDialog"
    const products = ref()
    const totalProducts = ref(0)
    const infoProducts = ref()
    const selectedPrice = ref()
    const searchQuery = ref()
    const isDelete = ref(false);
    const deleteProduct = ref()
    const priceLevels = ["100,000 - 1,000,000", "1,000,000 - 5,000,000", "5,000,000 - 20,000,00", "> 20,000,000"]
    let productData;
    const loading = ref(false)
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
            title: 'Product Name',
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
        loading.value = true;
        const res = await axios.get('https://apishopdc.vercel.app/products')
        .then((res) => {
            productData = res.data.data;
            infoProducts.value = productData;
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            loading.value = false;
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

    //search product
    const removeDiacritics = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const searchProduct = () => {
    infoProducts.value = productData;
    if(searchQuery.value) {
       infoProducts.value = infoProducts.value.filter((product) => removeDiacritics(product.title.toLowerCase()).includes(removeDiacritics(searchQuery.value.toLowerCase())));
    }
    }
    watchEffect(searchProduct)


    //update totalProducts
    watch(infoProducts , () => {
    if(infoProducts .value) {
            totalProducts.value = infoProducts .value.length;
            if(totalProducts.value <= options.value.itemsPerPage) {
                options.value.page = 1;
            }
        }
    });

    //delete products
    const handleDeleteProduct = (product) => {
        isDelete.value = true;
        deleteProduct.value = product;
    }
</script>

<template>
    <section class="section">
        <VCard
            title="Search Filters"
            class="mx-2 my-6 border-sm"
        >
            <VCardText>
                <VRow>
                    <!-- Select Price-->
                    <VCol cols="12" sm="4">
                        <VSelect v-model="selectedPrice"
                            label="Select Price"
                            :items="priceLevels"
                            clearable
                            clear-icon="mdi-close"
                            variant="outlined"/>
                    </VCol>
                </VRow>
            </VCardText>
        </VCard>
        <VCard class="mx-2 my-6 border-sm">
            <VCardText class="d-flex justify-space-between flex-wrap gap-4">
                <!-- Export button -->
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <VBtn 
                            v-bind="props"
                            variant="outlined"
                            color="secondary"
                            prepend-icon="mdi-tray-arrow-up"
                        >
                            Export
                        </VBtn>
                    </template>
            
                </v-menu>

                <div class="app-product-search-filter d-flex flex-wrap align-center gap-x-6 gap-y-4" >
                    <!-- 👉 Search  -->
                    <VTextField
                        v-model="searchQuery"
                        placeholder="Search Product"
                        density="compact"
                        style="min-inline-size: 10rem; min-width: 200px; height: 40px; margin-right: 20px; margin-top: 10px"
                        clearable
                        clear-icon="mdi-close"
                        type="text"
                        variant="outlined"
                    />

                    <!-- 👉 Add product button -->
                    <VBtn
                        class="order-sm-2 order-1 mt-3 text-white bg-blue"
                        @click="isAddProduct = true"
                    >
                        Add Product
                    </VBtn>
                </div>
  
            </VCardText>
            <v-data-table-server class="border-sm"
                v-model:items-per-page="options.itemsPerPage"
                v-model:page="options.page"
                :headers="headers"
                :items="products"
                :items-length="totalProducts"
                :loading="loading"
            >
                <!-- Loading -->
                <template v-slot:loading>
                    <v-skeleton-loader :type="`table-row@${ options.itemsPerPage }`"></v-skeleton-loader>
                </template>
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

                <!-- price -->
                <template #item.price="{ item }">
                    <span>{{ item.price.toLocaleString("en-US", {style:"currency", currency:"VND"}) }}</span>
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
        <DeleteDialog 
            v-model:isDelete="isDelete"
            v-model:deleteProduct="deleteProduct"
        />
    </section>

</template>


<style>
    .section {
        /* padding-top: 40px; */
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

    .v-field__outline {
        border: 1px solid #ccc !important;
        outline: none;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .v-field__loader {
        width: 0 !important;
    }

    .v-field__overlay {
        background: #fff !important;
        border-radius: 6px !important;
    }
    
</style>