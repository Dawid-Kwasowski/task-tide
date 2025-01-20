const validationMessages = {
  required: "Pole jest wymagane!",
  maxLength: "Maksymalna liczba znaków: {count}",
  invalidEmail: "Nieprawidłowy email",
};

const errors = {
  conflict: "Taki użytkownik już istnieje!",
  codes: {},
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
        management: "Zardządzaj profilami",
        editName: "Edytuj imię",
        deleteProfile: "Usuń użytkownika",
        editAvatar: "Edytuj zdjęcie",
      },
      signIn: {
        t: "Witamy ponownie",
      },
      signUp: {
        t: "Dołącz do nas",
      },
      email: "Wpisz email",
      password: "Wpisz hasło",
    },
    components: {
      confirmDialog: {
        delete: "Usuń",
        cancel: "Anuluj",
      },
    },
    accounts: {
      createProfile: "Stwórz konto",
      chooseProfile: "Wybierz profil",
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
