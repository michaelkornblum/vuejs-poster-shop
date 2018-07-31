const price = 9.99

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: 'anime',
        lastSearch: '',
        loading: false,
        price,
    },
    methods: {
        onSubmit: function() {
            this.items = [];
            this.loading = true;
            this.$http
            .get('/search/'.concat(this.newSearch))
            .then(function(res) {
                this.lastSearch = this.newSearch;
                console.log(res.data);
                this.items = res.data;
                this.loading = false;
            });
        },
        addItem: function (index) {
            this.total += price;
            let item = this.items[index];
            let result = this.cart.filter(cartItem => cartItem.id === item.id)[0];

            if (!result) {
                item.qty = 1;
                item.price = price;
                this.cart.push(item);
            } else {
                item.qty++;
            }
        },
        inc: function(item) {
            item.qty++
            this.total += price;
        },
        dec: function(item) {
            item.qty--;
            this.total -= price;
            this.cart = this.cart.filter(cartItem => cartItem.qty > 0);
        }
    },
    filters: {
        currency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function() {
        this.onSubmit();
    }
});
