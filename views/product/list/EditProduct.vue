<script setup>
    import { 
        emailValidator,
        requiredValidator,
    } from "@/@core/utils/validators"
    import axios from "axios";
    import { toast } from 'vue3-toastify';
    import { watchEffect } from "vue";
    const productName = ref();
    const newPrice = ref();
    const oldPrice = ref();
    const amount = ref();
    const linkImg = ref();
    const refForm = ref();
    const productId = ref();
    const props = defineProps({
        isEditProduct: {
            type: Boolean,
            required: true,
        },
        productEdit: {
            type: Object,
        }
    })

    const setDefaultValue = () => {
        if(props.isEditProduct) {
            productId.value = props.productEdit.id;
            productName.value = props.productEdit.title;
            newPrice.value = props.productEdit.price;
            oldPrice.value = props.productEdit.price_old;
            amount.value = props.productEdit.limit;
            linkImg.value = props.productEdit.src;
        } 
    }
    watchEffect(setDefaultValue)

    const emit = defineEmits([
        'update:isEditProduct',
        'productEdit'
    ])

    const closeDialog = () => {
        emit('update:isEditProduct',false);
        nextTick(() => {
            refForm.value?.reset()
            refForm.value?.resetValidation()
        })
    }

    const editProduct = () => {
        refForm.value?.validate().then(async({valid}) => {
            if(valid) {
                const body = {
                    title: productName.value,
                    price: newPrice.value,
                    price_old: oldPrice.value,
                    limit: amount.value,
                    src: linkImg.value,
                }
                await axios.patch(`https://apishopdc.vercel.app/products/${productId.value}`, body)
                .then((res) => {
                    toast.success(res.data.message);
                    emit('update:isEditProduct',false);
                    emit('productEdit', res.data.data);
                })
                .catch((e) => {
                    toast.error(e.message);
                })
                nextTick(() => {
                    refForm.value?.reset()
                    refForm.value?.resetValidation()
                })
            }
        })
       
    }
</script>

<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="props.isEditProduct" max-width="550" persistent>
            <v-card>
                <v-card-title>
                    <v-icon icon="mdi-pencil" color="yellow"/> Edit Product
                </v-card-title>
                <v-card-text>
                    <v-form ref="refForm" @submit.prevent="editProduct" >
                        <v-row>
                            <!-- product name -->
                            <v-col cols="12">
                                <v-text-field
                                    v-model="productName"
                                    :rules="[requiredValidator]"
                                    style="min-inline-size: 10rem; min-width: 200px;"
                                    type="text"
                                    variant="outlined"
                                    label="Product name"
                                    placeholder="Laptop Dell"
                                ></v-text-field>
                            </v-col>
                            <!-- New Price -->
                            <v-col cols="12">
                                <v-text-field
                                    v-model="newPrice"
                                    :rules="[requiredValidator]"
                                    style="min-inline-size: 10rem; min-width: 200px; margin-top: -10px;"
                                    type="number"
                                    variant="outlined"
                                    label="New price"
                                    placeholder="3000000"
                                ></v-text-field>
                            </v-col>

                            <!-- Old price -->
                            <v-col cols="12">
                                <v-text-field
                                    v-model="oldPrice"
                                    :rules="[requiredValidator]"
                                    style="min-inline-size: 10rem; min-width: 200px; margin-top: -10px;"
                                    type="number"
                                    variant="outlined"
                                    label="Old price"
                                    placeholder="3000000"
                                ></v-text-field>
                            </v-col>
                            
                            <!-- amount -->
                            <v-col cols="12">
                                <v-text-field
                                    v-model="amount"
                                    :rules="[requiredValidator]"
                                    style="min-inline-size: 10rem; min-width: 200px; margin-top: -10px;"
                                    type="number"
                                    variant="outlined"
                                    label="Amount of products"
                                    placeholder="100"
                                ></v-text-field>
                            </v-col>

                            <!-- link img -->
                            <v-col cols="12">
                                <v-text-field
                                    v-model="linkImg"
                                    :rules="[requiredValidator]"
                                    style="min-inline-size: 10rem; min-width: 200px; margin-top: -10px;"
                                    type="text"
                                    variant="outlined"
                                    label="Link image"
                                    placeholder="https://go.live.png"
                                ></v-text-field>
                            </v-col>

                            <!-- add and cancel -->
                            <v-col cols="12" class="text-end">
                                <v-btn @click="closeDialog" class="mr-6 text-white bg-blue">Cancel</v-btn>
                                <v-btn type="submit" class="mr-6 text-white bg-green">Submit</v-btn>
                            </v-col>
                            
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                   
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<style>

</style>