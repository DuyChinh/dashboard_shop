<script setup>
    import { ref } from "vue"
    import axios from 'axios'
    import { toast } from 'vue3-toastify';
    import {
        emailValidator,
        requiredValidator,
    } from '@/@core/utils/validators'

    const props = defineProps({
        isDelete: {
            type: Boolean,
            require: false,
        },
        deleteProduct: {
            type: Object,
        }
    });

    const emit = defineEmits([
        'update:isDelete',
        'productData'
    ]);

    const closeDialog = () => {
        emit('update:isDelete', false);
    }
    
    const deleteAction = (id) => {
        const product = axios.delete(`https://apishopdc.vercel.app/products/${id}`)
        .then((res) => {
            emit('update:isDelete', false);
            emit('productData', product);
            toast.success(res.data.message);
        })
        .catch((e) => {
            emit('update:isDelete', false);
            toast.error(e.message);
        })
    }

</script>

<template>
    <v-dialog v-model="props.isDelete" width="auto">
        <v-card>
            <v-card-title class="d-flex align-center pt-5">
                <v-icon icon="mdi-alert" class="mr-3" color="error"></v-icon>
                Confirm delete user
            </v-card-title>
            <v-card-text>
                Are you sure you want to delete?<br>
            </v-card-text>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog">Cancel</v-btn>
                <v-btn @click="() => {
                    deleteAction(props.deleteProduct?.id)
                }">Confirm</v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>


<style>

</style>