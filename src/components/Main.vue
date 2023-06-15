<script setup>
import { ref } from "vue";
import Data from '@/data';
import { onClickOutside } from '@vueuse/core';
import { XMarkIcon } from '@heroicons/vue/24/solid';

const data = Data;
const receipts = ref([]);
const orderData = ref([]);
const content = ref(null);
const inputVal = ref(null);
const dropDownData = ref([]);
const activeOrder = ref(null);

onClickOutside(content, (event) => {
    dropDownData.value = [];

    orderData.value = Object.values(orderData.value).filter((item) => item !== 'Menu-Item' && item !== 'Ingredient');
});

const onInput = (e) => {
    inputVal.value = e.target.value;
    const searchVal = e.target.value.toUpperCase();
    if (searchVal) {
        dropDownData.value = dropDownData.value.filter(item => item.toUpperCase().indexOf(searchVal) > -1)
    } else {
        dropDownData.value = Object.keys(data)
    }
}

const onClick = () => {
    if (!dropDownData.value.length || orderData[orderData.length - 1] === 'And') {
        dropDownData.value = Object.keys(data)
    }
}

const totalPrice = (receiptOrders) => {
    return receiptOrders.reduce((sum, transaction) => {
        return sum += transaction.price;
    }, 0);
}

const onSelectItem = (selected) => {
    if (selected === 'Menu-Item') {
        dropDownData.value = Object.values(data[selected]);
        if (orderData.value.length && orderData.value[0] !== 'Menu-Item' && orderData.value[orderData.value.length - 1] !== 'And') {
            orderData.value.push('And');
        }
    } else if (data['Menu-Item'][selected.name]) {
        dropDownData.value = data;
        activeOrder.value = selected;
        selected.label = 'M / ' + selected.name;
    } else if (activeOrder.value?.ingredients){
        if (selected === 'Ingredient') {
            dropDownData.value = activeOrder.value.ingredients
        } else {
            dropDownData.value = data;
            if (selected !== 'And') {
                selected = {
                    label: `I / ${selected}`,
                }
            }
        }
    }
    if (activeOrder.value || selected !== 'Ingredient') {
        if (selected !== 'And' || (selected === 'And' && orderData.value.length && orderData.value[orderData.value.length - 1] !== 'And')) {
            orderData.value.push(selected);
        }
        if (selected !== 'Menu-Item' && selected !== 'Ingredient') {
            orderData.value = Object.values(orderData.value).filter((item) => item !== 'Menu-Item' && item !== 'Ingredient');
        }
    }
}

const removeItem = (index, isIngredient) => {
    let cutIndex = index;
    if (orderData.value.indexOf('And') < 0) {
        cutIndex = orderData.value.length
    } else {
        for (let i = index; i < orderData.value.length; i++) {
            if (orderData.value[i] === 'And') {
                cutIndex = (i - index) + 1;
                break;
            }
        }
    }
    if (isIngredient) {
        orderData.value.splice(index, 1);
    } else {
        orderData.value.splice(index, cutIndex);
    }
}

const checkout = () => {
    receipts.value.push(Object.values(orderData.value).filter((item) => item?.ingredients))
    orderData.value = [];
    activeOrder.value = null;
    dropDownData.value = []
}

const colorsByValue = (value) => {
    let colors = {}
    if (value === 'Menu-Item' || value?.ingredients) {
        colors.bg = 'bg-indigo-300';
        colors.text = 'text-indigo-400';
        colors.border = 'border-indigo-400';
    } else if (value === 'Ingredient' || !value?.ingredients) {
        colors.bg = 'bg-blue-300';
        colors.text = 'text-blue-400';
        colors.border = 'border-blue-400';
    }
    if (value === 'And') {
        colors.bg = 'bg-orange-300';
        colors.text = 'text-orange-400';
        colors.border = 'border-orange-400';
    }

    return colors;
}
</script>
<template>
    <div class="relative z-20 m-auto max-w-2xl mt-[20%]" ref="content">
        <div class="px-5 text-center pb-6 relative z-20 flex justify-center items-center">
            <img src="../assets/hamburger.png" class="w-logo" alt="">
            <p class="text-black text-xl ml-2 font-bold">YOLO</p>
        </div>
        <div class="w-full flex border border-red-300 bg-white items-center px-4 py-2 flex-wrap">
            <div class="flex items-center flex-wrap" v-if="orderData.length">
                <button class="flex items-center border px-2 py-1" :class="colorsByValue(item).bg"
                        v-for="(item, index) in orderData" :key="item">
                    <span class="text-white text-xs">{{ item.label ? item.label : item.name ? item.name : item }}</span>
                    <span v-if="item !== 'And'" class="ml-2 rounded-full border" :class="colorsByValue(item).border"
                          @click="removeItem(index, !item.ingredients??false)">
                        <XMarkIcon class="w-3 h-3" :class="colorsByValue(item).text"/>
                    </span>
                </button>
            </div>
            <div class="relative flex-1">
                <input type="text" @input="onInput" @click="onClick" :value="inputVal" class="w-full outline-none "
                       :class="{'px-3': orderData.length}" @keyup.enter="checkout">
                <span class="absolute right-0 cursor-pointer" @click="orderData = []">X</span>
            </div>
        </div>
        <div class="w-full border border-red-300 bg-white items-center py-2 mt-2 overflow-y-scroll max-h-[250px] "
             v-if="dropDownData.length">
            <div class="mb-2 text-sm pt-1 cursor-pointer" :class="item === 'And' ? 'border-t-1': ''"
                 v-for="(item, index) in dropDownData" :key="index" @click="onSelectItem(item)">
                <a role="button" class="mx-4 px-2 py-1">
                    {{ typeof item === 'object' ? item.name : item }}
                </a>
            </div>
        </div>
        <div v-for="receipt in receipts" class="w-full p-10 border border-red-300 bg-white items-center py-2 mt-2 overflow-y-auto h-[150px] max-h-[250px]">
            <p class="pb-2 text-black">Order:</p>
                <p  v-for="receiptOrder in receipt" class="pb-2 text-slate-600">{{`${receiptOrder.name} - ${receiptOrder.price} NIS`}}</p>
            <p class="text-black">Total - {{totalPrice(receipt)}} NIS</p>
        </div>

    </div>
</template>