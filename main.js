// MILESTONE 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) 
// e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

// MILESTONE 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, 
// visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// MILESTONE 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e 
// digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, 
// l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// MILESTONE 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, 
// vengono visualizzati solo i contatti il cui nome contiene le lettere inserite 
// (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// MILESTONE 5 - BONUS
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti


const vue = new Vue(
    {
        el: '#app',
        data: {
            currentContactAttivo: 0,
            newMessage: "",
            selected: "",
            lastDateAccess: "",
            activeMessage: "",
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
        },
        // fine array di oggeti - data

        methods: {
            // funzione per invio messaggio
            messageSent() {
                if(this.newMessage != '') {
                    this.contacts[this.currentContactAttivo].messages.push(
                        {
                            date: dayjs().format('DD/MM/YYYY h:mm:ss'),
                            text: this.newMessage,
                            status: 'sent'
                        }
                    );

                    setTimeout(this.messageReceived, 1000);
                }

                this.newMessage = '';
            },
            // funzione per far apparire la chat dell'utente cliccato
            currentActive(index) {
                this.currentContactAttivo = index
            },
            // funzione per risposta
            messageReceived() {
                this.contacts[this.currentContactAttivo].messages.push(
                    {
                        date: dayjs().format('DD/MM/YYYY h:mm:ss'),
                        text: 'Ok!',
                        status: 'received'
                    }
                );
            },
            // ricerca utenti nella barra di ricerca della chat
            searchRicerca() {
                const ricerca = this.selected;

                this.contacts.forEach(contact => {
                    if (!contact.name.toLowerCase().includes(ricerca.toLowerCase())) {
                        contact.visible = false;
                    } else if (this.selected == '') {
                        contact.visible = true;
                    }
                });
            },
            // mostra info correnti al contatto selezionato in 'ultimo accesso'
            dateCurrent() {
                let contactMessage = this.contacts[this.currentContactAttivo].messages;

                if (contactMessage[parseInt(contactMessage.length - 1)].status == 'received') {
                    lastAccess = contactMessage[parseInt(contactMessage.length - 1)].date;
                } else {
                    lastAccess = contactMessage[parseInt(contactMessage.length - 2)].date;
                }
                return this.lastDateAccess = lastAccess;
            },
            
        }
        // fine methods
    }
);