<template>
    <div id="cart">
        <!-- cart head part 1-->
        <div class="cart-head">
            <div class="cart-head-title">Shopping Cart</div>
            <div class="cart-head-main">
                <div class="cart-info">Items</div>
                <div class="cart-price">Price</div>
                <div class="cart-count">Quantity</div>
                <div class="cart-amount">Amount</div>
                <div class="cart-delete">Delete</div>
        </div>

        <!-- cart content part 2 -->
        <div class="cart-content">
            <!-- list all items in the cart -->
            <div class="cart-content-main" 
            v-for="(item,index) in cartList" :key="index">
                <div class="cart-info">
                    <img src="../images/airPods.jpg" alt="">
                    <span>{{ productDict[item.id].name }}</span>
                </div>
                <div class="cart-price">
                    ${{ productDict[item.id].cost }}
                </div>
                <div class="cart-count">
                    <span class="cart-control-minus"
                    @click.prevent="editCart({id:item.id, count:-1})">-</span>
                    {{ item.count}}
                    <span class="cart-control-add"
                    @click.prevent="editCart({id:item.id, count:+1})">+</span>
                </div>
                <div class="cart-amount">
                    ${{ productDict[item.id].cost *item.count}}
                </div>
                <div class="cart-delete">
                    <span @click="deleteCart(item.id)" class="cart-control-delete">Delete</span>
                </div>
            </div>

            <!-- when cart is empty -->
            <div v-if="!cartList.length" class="cart-empty">Your Shopping Cart is Empty</div>
        </div>

        <!-- end of the cart -->
        <div v-if="cartList.length" class="cart-footer">
            <div class="cart-footer-total">
                Count<span>{{ countAll }}</span>
            </div>
            <div class="cart-footer-total">
                Total<span>${{ priceAll }}</span>
            </div>
            <div class="cart-footer-order"
            @click.prevent="handleCheckout">
                <span>Check Out</span>
            </div>

        </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    name: "Cart",
    data(){
        return{
        }
    },
    methods:{
        ...mapMutations([ 'deleteCart', 'editCart' ]),
        ...mapActions(['checkOut']),
        handleCheckout(){
            this.checkOut();
        }
    },
    computed: {
        ...mapGetters(['cartList', 'productDict']),
        countAll: function(){
            let count = 0;
            this.cartList.forEach(item => {
                count += item.count;
            });
            return count;
        },
        priceAll(){
            let total = 0;
            this.cartList.forEach(item => {
                total += this.productDict[item.id].cost * item.count;
            });
            return total
        }

    }    
}
</script>

<style lang="scss">
#cart {
    margin: 32px;
    border: 1px solid #dddee1;
    border-radius: 10px;
    background: #fff;
    padding-bottom: 20px;
}

.cart-head{
    .cart-head-title{
        font-size: 1.2em;
        padding: 20px 30px;
    }
    .cart-head-main{
        display: flex;
        justify-content: space-between;
        background: lightgray;
        padding: 10px 30px;

    }
}

.cart-price{
    margin-left: 40%;
}
.cart-info {
    width: 100px;
    img{
        width: 50%;
    }
}

.cart-content{
   // display: flex;
    .cart-content-main{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 30px;
        border-bottom: 1px dashed #dddee1;
    }
    .cart-delete {
        background: #2d8cf0;
        color: #fff;
        border-radius: 3px;
        padding: 5px;
        cursor: pointer;
    }
}

.cart-control-minus,
.cart-control-add{
    display: inline-block;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    background: #f8f8f9;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    cursor: pointer;
}
.cart-promotion {
    display: flex;
    padding: 10px 30px;
    font-size: 0.8em;
    input {
        margin: 0 5px;
    }
}

.cart-footer-order{
    background: #2d8cf0;
    color: #fff !important;
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
}
.cart-delete:hover,
.cart-footer-order:hover{
    background-color: #2166af;

}
.cart-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 30px;
    font-size: 1.2em;
    .cart-footer-total{
        padding: 5px 10px;
        span{
            padding-left: 5px;
            color: red;
        }
    }
}

.cart-empty {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.2em;
    font-style: italic;
    color: gray;
}
</style>