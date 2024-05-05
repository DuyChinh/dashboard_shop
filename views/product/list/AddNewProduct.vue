<script setup>
    import { 
        emailValidator,
        requiredValidator,
    } from "@/@core/utils/validators"
    const productName = ref();
    const newPrice = ref();
    const oldPrice = ref();
    const props = defineProps({
        isAddNewProduct: {
            type: Boolean,
            required: true,
        }
    })
</script>

<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="props.isAddNewProduct" max-width="400" >
            <v-card>
                <v-card-title>
                    Add New Product
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent>
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
                                    type="text"
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
                                    type="text"
                                    variant="outlined"
                                    label="Old price"
                                    placeholder="3000000"
                                ></v-text-field>
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