import inquirer from 'inquirer';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

async function main() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Scegli un\'azione:',
        choices: ['Cerca studente per matr', 'Aggiungi studente', 'Esci']
      },
    ]);

    if (action === 'Cerca studente per matr') {
      const { matr } = await inquirer.prompt([
        {
          type: 'input',
          name: 'matr',
          message: 'Inserisci il numero di matricola:'
        },
      ]);

      try {
        const response = await axios.get(`${baseURL}/${matr}`);
        console.log(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dello studente:', error.message);
      }

    } else if (action === 'Aggiungi studente') {
      const { name, surname, matr } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Inserisci il nome:'
        },
        {
          type: 'input',
          name: 'surname',
          message: 'Inserisci il cognome:'
        },
        {
          type: 'input',
          name: 'matr',
          message: 'Inserisci il numero di matricola:'
        },
      ]);

      try {
        const response = await axios.post(`${baseURL}/${name}/${surname}/${matr}`);
        console.log(response.data);
      } catch (error) {
        console.error('Errore durante l\'aggiunta dello studente:', error.message);
      }

    } else {
      break;
    }
  }
}

main().catch((error) => {
  console.error('Errore:', error.message);
});
