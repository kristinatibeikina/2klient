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
            if(this.column1.length===3){
                this.errors.push("Не более 3 заметок в 1 колонке")
            }
            if (this.cardTitle !== ''  && this.column1.length<3) {
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
                this.cardText = '';
                this.saveCards();
            }

        },
        saveCards() {
            const cards = {
                column1: this.column1,
                column2: this.column2,
                column3: this.column3
            };

            localStorage.setItem('cards', JSON.stringify(cards));
        },
        updateCardStatus() {
            this.column1.forEach(card => {
                const completedItems = card.items.filter(item => item.completed).length;
                const completionPercentage = (completedItems / card.items.length) * 100;

                if (completionPercentage >= 50) {
                    while (this.column2.length < 5) {
                        this.column2.push(card);
                        this.column1 = this.column1.filter(c => c.id !== card.id);
                        break;
                    }
                }

            });

            this.column2.forEach(card => {
                const completedItems = card.items.filter(item => item.completed).length;
                const completionPercentage = (completedItems / card.items.length) * 100;

                if (completionPercentage === 100) {
                    card.completedItems = completedItems;
                    this.column3.push(card);
                    this.column2 = this.column2.filter(c => c.id !== card.id);
                }
            });

            this.saveCards();
        },
        loadCards() {
            const savedCards = JSON.parse(localStorage.getItem('cards'));

            if (savedCards) {
                this.column1 = savedCards.column1 || [];
                this.column2 = savedCards.column2 || [];
                this.column3 = savedCards.column3 || [];
            }
        },

    },
    watch: {
        'column1': {
            handler() {
                this.updateCardStatus();
            },
            deep: true
        },
        'column2': {
            handler() {
                this.updateCardStatus();
            },
            deep: true
        }
    }

})