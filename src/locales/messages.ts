const validationMessages = {
   required: 'Pole jest wymagane!',
   maxLength: 'Maksymalna liczba znaków: {count}',
   invalidEmail: 'Nieprawidłowy email'
}

const errors = {
   conflict: 'Taki użytkownik już istnieje!'
}

export const messages = {
   pl: {
      app: {
         t: 'TaskTide',
         validationMessages,
         errors,
      },
      auth: {
         signInTab: 'Zaloguj się',
         signUpTab: 'Stwórz konto',
         signIn: {
            t: 'Witamy ponownie',
         },
         signUp: {
            t: 'Dołącz do nas'
         },
         email: 'Wpisz email',
         password: 'Wpisz hasło',
         
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