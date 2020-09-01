import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const app = new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                phone: '',
            },
            contacts: []
        }
    },
    computed: {
        inputValidation() {
            return this.form.name.trim() && this.form.phone.trim();
        }
    },
    methods: {
        async create() {
            const {...contact} = this.form;
            await request('/api/contacts', 'POST', contact);
            this.contacts = await request('/api/contacts');
            this.form.name = this.form.phone = '';
        },
        async remove(id) {
            await request(`/api/contacts/${id}`, 'DELETE');
            this.contacts = await request('/api/contacts');
        },
    },
    async mounted() {
        this.contacts = await request('/api/contacts');
    }

});

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method, headers, body
        });

        return await response.json();

    } catch (e) {
        console.warn('Error:', e.message);
    }
}
