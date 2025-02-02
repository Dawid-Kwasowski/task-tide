const validationMessages = {
  required: "Pole jest wymagane!",
  minLength: "Minimalna liczba znaków: {count}",
  maxLength: "Maksymalna liczba znaków: {count}",
  invalidEmail: "Nieprawidłowy email",
  passwordMustMach: "Podane hasła się różnią",
};

const errors = {
  conflict: "Taki użytkownik już istnieje!",
  invalidCredential: "Nieprawidłowy login lub hasło!",
  smthGoesWrong: "Coś poszło nie tak",
};

const navigation = {
  general: "Ogólne",
  duties: "Obciążenia służbowe",
};

export const messages = {
  pl: {
    app: {
      t: "TaskTide",
      validationMessages,
      errors,
    },
    auth: {
      signInTab: "Zaloguj się",
      signUpTab: "Stwórz konto",
      editProfiles: {
        done: "Zrobione",
        management: "Zardządzaj profilami",
        editName: "Edytuj imię",
        deleteProfile: "Usuń użytkownika",
        editAvatar: "Zmień zdjęcie",
        addAvatar: "Dodaj zdjęcie",
      },
      signIn: {
        t: "Mam już konto!",
        resetPassword: "Zapomniałeś hasła?",
      },
      signUp: {
        t: "Jestem tu nowy!",
      },
      email: "Wpisz email",
      password: "Wpisz hasło",
    },

    account: {
      t: "Konto użytkownika",
      sections: {
        email: {
          field: "Wpisz email",
        },
      },
    },

    updatePassword: {
      t: "Aktualizacja hasła",
      description: "Wpisz swoje nowe hasło 🤫",
      fields: {
        password: "Wprowadź hasło",
        confirmPassword: "Potwierdź hasło",
      },
      update: "Zaaktualizuj",
      notification: {
        updated: "Hasło zostało zaktualizowane",
      },
    },
    resetPassword: {
      t: "Reset Hasła",
      description:
        "Przed wysłaniem upewnij się, że email, jest przypięty do konta",
      fields: {
        email: "Wprowadź swój email",
      },
      send: "Wyślij",
      back: "Powrót",
      notification: {
        checkEmail: "Sprawdź podanego przez ciebie maila",
      },
    },

    components: {
      confirmDialog: {
        delete: "Usuń",
        cancel: "Anuluj",
      },
    },
    profiles: {
      createProfile: "Stwórz profil",
      chooseProfile: "Wybierz profil",
      emptyList: "Stwórz nowy profil",
      logout: "Wyloguj się",
      newProfile: {
        t: "Dodaj profil",
        subtitle: "Dodaj kolejny profil osoby korzystjącej z serwisu Vtime",
        username: "Wpisz imię",
        deleteAvatar: "Usuń zdjęcie",
        editPhoto: "Wybierz inne zdjęcie",
        next: "Dalej",
        cancel: "Anuluj",
      },
    },
    home: {
      fab: {
        t: "Dodaj zadanie",
      },
      bar: {
        hello: "Witaj!",
        navigation,
      },
      task: {
        notification: {
          created: "Zadanie zostało utoworzone",
          edited: "Zadanie zostało edytowane",
          deleted: "Zadanie zostało usunięte",
        },
        t: "Nowe zadanie",
        placeholder: "Tytuł zadania",
        todayList: "Lista zadań na dziś",
        closestTask: "Najblisze zadania",
        emptyList: "Brak zadań",
        addTask: "Dodaj zadanie",
        editMode: "Edytuj Zadanie",
        description: "Opis zadania (opcjonalne)",
        noDescription: "Brak opisu",
        confirmDialogTitle: "Usunąć zaznaczone zadanie?",
        confirmDialogContent:
          "Zadanie zostanie usunięte na stałe, czy chcesz to zrobić?",
      },
      room: {
        notification: {
          created: "Pokój został utoworzony",
          edited: "Pokój został edytowany",
          deleted: "Pokój został usunięty",
          rotated: "Wykonano rotacje",
        },
      },
      duty: {
        t: "Obciążenia służbowe",
        rotation: "Rotacja",
        editModeOn: "Włącz tryb Edycji",
        editModeOff: "Wyłącz tryb Edycji",
        notification: {
          created: "Obowiązek został utoworzony",
          edited: "Obowiązek został edytowany",
          deleted: "Obowiązek został usunięty",
        },
        list: {
          empty: "Brak przypisanych obowiązków",
        },
        confirmRemoveRoom: {
          t: "Chcesz usunąć pokój",
          content: "Pokój zostanie usunięty na stałe, czy chcesz to zrobić?",
        },
        confirmRemoveDuty: {
          t: "Usunąć zaznaczony obowiązek?",
          content:
            "Obowiązek zostanie usunięty na stałe, czy chcesz to zrobić?",
        },

        addRoom: "Dodaj pokój",
        roomList: {
          empty: "Brak Pokoi",
        },
        roomForm: {
          newRoom: "Dodaj pokój",
          editRoom: "Edytuj pokój",
          name: "Nazwa",
          profiles: "Lista profili",
        },
        dutyForm: {
          newDuty: "Nowy obowiązek",
          editDuty: "Edytuj zadanie",
          title: "Tytuł",
          description: "Opis",
          add: "Dodaj",
          edit: "Zmień",
        },
      },
    },
  },
};
