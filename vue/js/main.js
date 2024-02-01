const app = new Vue({
    el: '#app',
    data: {
        cardTitle: '',
        cardText: [],
        column1: [],
        column2: [],
        column3: [],
        stop:0,
        errors:[],

    },
    mounted() {
        this.loadCards();

    },
    methods: {
        createCard() {
            if (this.cardTitle !== '') {
                const newCard = {
                    id: Date.now(),
                    title: this.cardTitle,
                    items: [
                        { id: 1, text: '', completed: false },
                        { id: 2, text: '', completed: false },
                        { id: 3, text: '', completed: false },
                        { id: 4, text: '', completed: false },
                        { id: 5, text: '', completed: false },
                    ],
                    completedItems: 0,
                    completedDate: ''
                };
                this.column1.push(newCard);
                this.cardTitle = '';
                this.saveCards();
            }

        },
        saveCards() {
            const cards = {
                column1: this.column1,
            };
            localStorage.setItem('cards', JSON.stringify(cards));
        },

    },


})