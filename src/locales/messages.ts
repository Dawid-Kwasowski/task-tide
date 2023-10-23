const validationMessages = {
   required: 'Pole jest wymagane!',
   maxLength: 'Maksymalna liczba znaków: {count}'
}

const errors = {
   conflict: 'Taki użytkownik już istnieje!'
}

export const messages = {
   pl: {
      app: {
         t: 'VTime',
         validationMessages,
         errors,
      },
      accounts: {
         createProfile: 'Stwórz konto',
         chooseProfile: 'Wybierz profil',
         newProfile: {
            t: 'Dodaj profil',
            subtitle: 'Dodaj kolejny profil osoby korzystjącej z serwisu Vtime',
            username: 'Wpisz imię',
            deleteAvatar: 'Usuń zdjęcie',
            editPhoto: 'Wybierz inne zdjęcie',
            next: 'Dalej',
            cancel: 'Anuluj'
         } 
      }
   }
}