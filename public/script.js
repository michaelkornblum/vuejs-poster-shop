const price = 9.99

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            {
                id: 1, title: 'item 1',
            },
            {
                id: 2, title: 'item 2',
            },
            {
                id: 3, title: 'item 3',
            },
        ],
        cart: [],
        search: '',
    },
    methods: {
        onSubmit: function() {
            console.log(this.search);
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
    }
});
