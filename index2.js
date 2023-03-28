import inquirer from 'inquirer';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

function cercaStudente(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'matr',
            message: 'Inserisci il numero di matricola:',
            validate: function (value) {
                var pass = value.match(
                    /^[0-9]+$/
                );
                if (pass) {
                    return true;
                }
                return 'Inserisci una matricola valida';
            }
        }
    ]).then((answers) => {
        axios.get(`${baseURL}/${answers.matr}`).then((response) => {
            console.log(response.data);
            main();
        }).catch((error) => {
            console.error('Errore durante il recupero dello studente:', error.message);
            main();
        });
    }).catch((error) => {
        console.error('Errore durante il recupero dello studente:', error.message);
        main();
    });
}

function aggiungiStudente(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Inserisci il nome:',
            validate: function (value) {
                var pass = value.match(
                    /^[a-zA-Z]+$/
                );
                if (pass) {
                    return true;
                }
                return 'Inserisci un nome valido';
            }
        },
        {
            type: 'input',
            name: 'surname',
            message: 'Inserisci il cognome:',
            validate: function (value) {
                var pass = value.match(
                    /^[a-zA-Z]+$/
                );
                if (pass) {
                    return true;
                }
                return 'Inserisci un cognome valido';
            }
        },
        {
            type: 'input',
            name: 'matr',
            message: 'Inserisci il numero di matricola:',
            validate: function (value) {
                var pass = value.match(
                    /^[0-9]+$/
                );
                if (pass) {
                    return true;
                }
                return 'Inserisci una matricola valida';
            }
        },
    ]).then((answers) => {
        axios.post(`${baseURL}/${answers.name}/${answers.surname}/${answers.matr}`).then((response) => {
            console.log(response.data);
            main();
        }).catch((error) => {
            console.error('Errore durante l\'aggiunta dello studente:', error.message);
            main();
        });
    }).catch((error) => {
        console.error('Errore durante l\'aggiunta dello studente:', error.message);
        main();
    });
}

function cancellaStudente(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'matr',
            message: 'Inserisci il numero di matricola:',
            validate: function (value) {
                var pass = value.match(
                    /^[0-9]+$/
                );
                if (pass) {
                    return true;
                }
                return 'Inserisci una matricola valida';
            }
        }
    ]).then((answers) => {
        axios.delete(`${baseURL}/${answers.matr}`).then((response) => {
            console.log(response.data);
            main();
        }).catch((error) => {
            console.error('Errore durante l\'eliminazione  dello studente:', error.message);
            main();
        });
    }).catch((error) => {
        console.error('Errore durante l\'eliminazione dello studente:', error.message);
        main();
    });
}

async function main() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Scegli un\'azione:',
            choices: ['Cerca studente per matr', 'Aggiungi studente', 'Elimina studente', 'Esci']
        },
    ]).then((answers) => {
        if (answers.action === 'Cerca studente per matr') {
            cercaStudente();
        } else if (answers.action === 'Aggiungi studente') {
            aggiungiStudente();
        } else if (answers.action === 'Elimina studente') {
            eliminaStudente();
        } else {
            console.log('Arrivederci!');  
        }
    }).catch((error) => {
        console.error('Errore:', error.message);
        main();
    });
}

main().catch((error) => {
  console.error('Errore:', error.message);
});