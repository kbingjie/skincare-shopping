<template>
    <div id="main" >       
        <div class="list-control">
            <!-- filter options -->
            <div class="list-control-filter">
                <span>Brand:</span>
                <span class="list-control-filter-item"
                :class="{active: brand === filterBrand}"
                @click.prevent="handleBrand(brand)" 
                v-for="(brand,index) in brands" :key="index">{{brand}}</span>           
            </div>
            <div class="list-control-filter">
                <span>Color:</span>
                <span 
                class="list-control-filter-item"
                :class="{active: color === filterColor}"
                @click.prevent="handleColor(color)" 
                v-for="(color, index) in colors" :key="index">{{color}}</span>           
            </div>

            <!-- sort by -->
            <div class="list-control-order">
                <span>Sort By:</span>
                <span class="list-control-order-item"
                :class="{active:order === null}"
                @click.prevent="handleDefault">Default</span>
                <span class="list-control-order-item"
                :class="{active:order === 'sales'}"
                @click.prevent="handlePop">Popularity</span>
                <span class="list-control-order-item"
                :class="{active:order === 'cost'}"
                @click.prevent="handlePrice">Price</span>
            </div>
        </div>



        <!-- show products -->
        <div class="products">
            <div v-for="product in filters" :key="product.id" 
            @click="productPage(product.id)" class="product">       
                <img :src="product.image">
                <div class="name">{{ product.name | snippet }}</div>
                <span>{{ product.color }}</span><br>
                <small>{{ product.sales }}</small><br>
                <span>${{ product.cost}}</span>
            </div>
        </div>
        <Product />
    </div>
</template>

<script>
import Product from '../views/Product.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "Main",
    components:{
        Product
    },
    data(){
        return{
            filterBrand:null,
            filterColor:null,
            order:null
        }
    },
    methods: {
        ...mapActions(['fetchProducts']),
        //click event bringing to single product page
        productPage(id){
            console.log('I wanna go to this product page');
            console.log(id)
            this.$router.push({ name: 'Product', params: {id:id}})
        },
        handleBrand(brand){
            if(this.filterBrand === brand){
                this.filterBrand = null;
            } else {
                this.filterBrand = brand;
            }
        },
        handleColor(color){
            if(this.filterColor === color){
                this.filterColor = null;
            } else {
                this.filterColor = color;
            }
        },
        handleDefault(){
            this.order = null;
        },
        handlePop(){
            this.order = 'sales';
        },
        handlePrice(){
            this.order = 'cost';
        }
    },
    computed: {
        ...mapGetters(['productList', 'brands', 'colors']),
        filters(){
            //shadow copy productLIst
            let list = [...this.productList];
            //filter brand
            if(this.filterBrand){
                list = list.filter(item => item.brand === this.filterBrand)
            }
            // after filter brand then filter color
            if(this.filterColor){
                list = list.filter(item => item.color === this.filterColor)
            }
            //order the list
            if(this.order){
                if(this.order === 'sales'){
                    list = list.sort((a,b) => b.sales - a.sales);
                } else if(this.order === 'cost'){
                    list = list.sort((a,b) => b.cost - a.cost);
                }
            }
            return list;
        }
    },
    created(){
        this.fetchProducts();
    } 
}
</script>

<style lang="scss" scoped>
.list-control {
    margin: 16px;
    padding:16px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    .list-control-filter{
        margin-bottom: 16px;
    }
}
.list-control-filter-item,.list-control-order-item {
    border-radius: 3px;
    border: 1px solid #e9eaec;
    padding: 3px 5px;
    margin-left: 10px;
    cursor: pointer;
}

.products {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-gap: 20px;
    padding: 16px;
    .product{
        border: 1px solid #e9eaec;
        border-radius: 10px;
        background: #fff;
        cursor: pointer;    
        height: 300px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
}

.active {
    background-color: red;
    border-radius: 5px;
    color: white;
}

</style>
