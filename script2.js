//  DANE WEJŚCIOWE
const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
];

const addNickname = (array) => {
  array.map((person) => {
    const nick1 = person.firstName.slice(0, 3).split("").reverse().join("");

    const nick2 = person.lastName
      .slice(person.lastName.length - 3, person.lastName.length)
      .split("");

    // normalnie użyłbym ponownie reverse().join(), ale w poleceniu było zamienić pierwszą i ostatnią literę stąd poniższe działania

    const nick2Temp = nick2[0];
    nick2[0] = nick2[nick2.length - 1];
    nick2[nick2.length - 1] = nick2Temp;

    let nick = nick1.concat(nick2.join("")).toLowerCase();
    nick = nick.charAt(0).toUpperCase() + nick.slice(1);
    person.nickname = nick;
  });
  return array;
};

console.log(addNickname(people));

/* 
    1. Napisz funkcję mapującą, która utworzy klucz(właściwość) nickname na każdej osobie w tablicy w następujący sposób:
    a) pobierze 3 pierwsze litery imienia, odwróci ich kolejność i zapisze do zmiennej
    //onazoL
    //Lozano
    b) pobierze 3 ostatnie litery nazwiska, zamieni kolejnością pierwszą i ostatnią i dołączy powstały string do poprzedniego
    c*) Zmieni wielkość liter w taki sposób, żeby powstały nick zaczynał się wielką literą i nie miał żadnych wielkich liter poza 1.
    d) Jeżeli liczba znaków w imieniu bądź nazwisku jest mniejsza niż 3, nickname będzie odpowiednio krótszy 
    e) rozważcie wszystkie skrajne przypadki, ponieważ Waszą funkcję mapującą wrzucimy do testów na platformie
    e) Have fun :)
    Na przykład:
    Dla osoby: 
    {
        firstName: 'Bartolomeo',
        lastName: 'Lozano'
    }
    powinniśmy uzyskać nickname Rabona
    Hints:
    - mając zmienną name = 'Bart'
      name.split('') => ['B', 'a', 'r', 't'] - tworzymy tablicę liter ze stringa
      ['B', 'a', 'r', 't'].join('') => 'Bart' - odwracamy ten proces
    - Na tablicy możemy użyć metody reverse()
    - Na stringach czy pojedynczych literkach możemy używać metod toLowerCase(), toUpperCase()
*/

//  DANE WEJŚCIOWE
const people2 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
  },
];

const intro = function introduction() {
  return `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickname}`;
};

function addIntroduction(array) {
  array.map((person) => {
    person.introduceYourself = intro;
  });
}

addIntroduction(people2);

people2.forEach((element) => {
  console.log(element.introduceYourself());
});
// console.log(people2);
/* 
    2. 
    a) Do każdego obiektu dodaj funkcję introduceYourself, która za pomocą słówka this wyświetli w konsoli tekst powitalny.
    Oczywiście tekst powinien wyświetlić się dopiero po wywołaniu funkcji.
    Dla powyższego przykładu tekst powinien wyglądać w następujący sposób:
    "Cześć jestem Bartolomeo Lozano, ale w szkole mówią na mnie [Rabona]"
    Natomiast wywołanie funkcji: people[0].introduceYourself()
    Obiekt z przykładu powinien wyglądać w ten sposób
    {
        firstName: "Bartolomeo",
        lastName: "Lozano",
        nickname: "Rabona",
        introduceYourself: // tutaj ma się znajdować funkcja
    },
    b) za pomocą pętli forEach, wywołaj funkcję powitalną dla każdego elementu tablicy. W rezultacie na ekranie powinien
    pojawić się tekst powitalny dla każdej osoby w tablicy
    Hints:
    - nie używaj w tym zadaniu funkcji strzałkowej, ponieważ słówko this Ci nie zadziała i nie będziesz miał(a)
    dostępu do this.firstName lastName i nickname
    - postaraj się zdefiniować funkcję powitalną tylko raz (nie rób tego w pętli, ani funkcji map)
    
*/

//  DANE WEJŚCIOWE
const people3 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself: "", // funkcja zamiast pustego stringa
  },
];

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

const colorFunction = function favouriteColor(number) {
  if (number < 1) {
    return `Podałeś za małą liczbę, liczba nie może być mniejsza niż 1`;
  } else if (number > 30) {
    return `Podałeś za dużą liczbę, liczba nie może być większa niż 30`;
  } else if (number == undefined) {
    const colorIndex =
      (this.firstName.length + this.lastName.length + this.nickname.length - 5) % colors.length;
    return colors[colorIndex];
  } else {
    const colorIndex =
      (this.firstName.length + this.lastName.length + this.nickname.length - number) %
      colors.length;
    return colors[colorIndex];
  }
};

function addFavouriteColor(array) {
  array.map((person) => {
    person.getFavouriteColor = colorFunction;
  });
}

addFavouriteColor(people3);
console.log(people3[0].getFavouriteColor(1));

/*
    3. 
    a) Dodaj do każdego obiektu funkcję getFavouriteColor
    b) funkcja ma przyjmować jeden parametr typu number z zakresu 1 - 30
    c) jeżeli podany parametr jest poza zakresem, powinien wyświetlić się odpowiedni komunikat
        - podałeś za małą liczbę, liczba nie może być mniejsza niż 1
        - podałeś za dużą liczbę, liczba nie może być większa niż 30
    d) w przypadku wywołania funkcji bez parametru, powinniśmy ustawić domyślną wartość na 5
    e) funkcja powinna zsumować wszystkie litery imienia, nazwiska i przezwiska, 
    odjąć od tej sumy liczbę wprowadzoną w parametrze, a następnie za pomocą działania modulo (%) względem długości tablicy kolorów
    wyznaczyć index
    f) za pomocą indexu funkcja powinna wyciągnąć odpowiedni kolor z tablicy i wyświetlić go w konsoli.
    Dla powyższego przykładu i liczby 5 wprowadzonej w parametrze, powinniśmy uzyskać wynik:
    (22 - 5) % 6 = 5
    console.log("orange")
    Hints
    - jeżeli po odjęciu parametru funkcji od sumy liter uzyskacie wartośc ujemną, możecie użyć metody z biblioteki Math, 
    Math.abs(-20), która zamieni liczbę na wartość absolutną, czyli dodatnią
    - w funkcji musicie użyć słówka this, parametru i tablicy, która jest na zewnątrz, tablica z kolorami może mieć
    dowoloną ilość kolorów
*/

/*
    4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
    a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
    b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
    c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory
*/

function favouriteColor(person, number) {
  if (number < 1) {
    return `Podałeś za małą liczbę, liczba nie może być mniejsza niż 1`;
  } else if (number > 30) {
    return `Podałeś za dużą liczbę, liczba nie może być większa niż 30`;
  } else if (number == undefined) {
    const colorIndex =
      (person.firstName.length + person.lastName.length + person.nickname.length - 5) %
      colors.length;
    return colors[colorIndex];
  } else {
    const colorIndex =
      (person.firstName.length + person.lastName.length + person.nickname.length - number) %
      colors.length;
    return colors[colorIndex];
  }
}

for (let person of people3) {
  console.log(favouriteColor(person, 14));
}

/*
    5. Zadanie polega na użyciu .filter() .map() .reduce w wersji łańcuchowej,
    czyli nie twórz nowych tablic w momencie wykonanie jednej z powyższych metod, połącz wykonanie ze sobą w jeden 
    "łańcuch" tzn. const wynik = arr.filter().map().reduce()
    a) Przefiltruj tablicę w taki sposób, aby zostały w niej osoby,
    których imię kończy się na literę 'a' lub 'k' 
    i nazwisko ma więcej znaków niż 6 
    i nick zawiera w sobie przynajmniej jedną literę a
    b) do powyższego warunku dodaj "furtkę" w postaci parametru isElite. Zmienna isElite powinna być obliczona
    za pomocą generatora liczb pseudolosowych Math.random(). Za pomocą tego generatora wylosujcie liczbę z zakresu 0 - 100.
    Jeżeli wartość losowej liczby będzie liczbą pierwszą lub będzie podzielna przez 3 i 5, ustawcie isElite na true, w pozostałych przypadkach
    isElite powinno być ustawione na false
    c) jeżeli zmienna isElite ma wartość true, nie bierzcie pod uwagę warunku z punktu a przy filtracji
    d) za pomocą funkcji map i for in odwróccie wartości i klucze w obiekcie, usuwając przy tym funkcje
    Przykład
    INPUT
    {
        firstName: "Bartolomeo",
        lastName: "Lozano",
        nickname: "Rabona",
        introduceYourself: '' // funkcja zamiast pustego stringa
        getFavouriteColor: '' // funkcja zamiast pustego stringa
    },
    OUTPUT
    {
        Bartolomeo: "firstName",
        Lozano: "lastName",
        Rabona: "nickname",
    },
    e) zredukuj tablicę obiektów do pojedynczego obiektu, który będzie zawierał wszystkie klucze i wartości
    wszystkich obiektów z tablicy, dzięki temu, że w punkcie d) odwrócilismy klucze z wartościami, nie będzie 
    z tym problemu :)
    f) posortuj tablicę alfabetycznie
*/

const people4 = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    nickname: "Rabona",
    introduceYourself: "sdsd",
    getFavouriteColor: "sdsdaa",
  },
  {
    firstName: "B888rtolomeoak",
    lastName: "Lozanolk",
    nickname: "Rabona",
    introduceYourself: "sadff4434",
    getFavouriteColor: "4433",
  },
  {
    firstName: "Ba572rtolomeo",
    lastName: "Lozano",
    nickname: "Rbon",
    introduceYourself: 434,
    getFavouriteColor: 2342,
  },
];

const filteredArray = function chain(array) {
  return array
    .map((person) => {
      const random = Math.round(Math.random() * 100);
      let isPrime = true;
      const eliteCheck = function elite() {
        for (let i = 2; i < random; i++) {
          if (random % i == 0) {
            isPrime = false;
            break;
          }
        }

        if (isPrime === true) {
          return true;
        } else if (random % 3 === 0 && random % 5 === 0) {
          return true;
        } else {
          return false;
        }
      };
      person.isElite = eliteCheck();
      return person;
    })
    .filter((person) => {
      if (person.isElite === true) {
        return person;
      } else if (
        (person.firstName[person.firstName.length - 1] === "a" ||
          person.firstName[person.firstName.length - 1] === "k") &&
        person.lastName.length > 6 &&
        person.nickname.indexOf("a") >= 0
      ) {
        return person;
      }
    })
    .map((person) => {
      let newArr = {};
      for (let key in person) {
        newArr[person[key]] = key;
        delete person.introduceYourself;
        delete person.getFavouriteColor;
      }
      return newArr;
    })
    .reduce((acc, obj) => {
      return { ...acc, ...obj };
    });
};

console.log(filteredArray(people4));
// filteredArray(people4);
/*
    *6. Currying function
    a) Napisz taką funkcję mnożącą 2 liczby, aby możliwe były następujące wywołania:
    - multi(5)(6)
    - const multiplyBySix = sum(6)
      multiplyBySix(10)
    b) Analogicznie napisz funkcję, która mnoży 4 liczby i możliwe jest wywołanie
    - multi(4)(5)(6)(10)
    Hints:
    - funkcja może zwracać inne funkcje
    - funkcja może korzystać ze zmiennych i parametrów funkcji zewnętrznych (czyli tych w których się znajduje)
*/

// Nie za bardzo zrozumiałem polecenie 6a, poniżej tylko 6b

const multi = (a) => {
  return (b) => {
    return (c) => {
      return (d) => {
        return a * b * c * d;
      };
    };
  };
};

console.log(multi(4)(5)(6)(10));

/*
    **7. Rekurencja
     a) Mając zagnieżdżony obiekt, wyciągnij z niego wszystkie imiona i dodaj do tablicy
     ***b) Jeżeli osoba ma więcej niż jedno imię, te imiona powinny znajdować się w jednym stringu w tablicy
     Na przykład 'Kamil Bartek'
    INPUT:
*/
const nestedObject = {
  name: "Kamil",
  children: [
    {
      name: "Zosia",
    },
    {
      name: "Krysia",
      name2: "Barbara",
      children: [
        {
          name: "Basia",
          children: [
            {
              name: "Monika",
              name2: "Viola",
              children: [
                {
                  name: "Mateusz",
                },
                {
                  name: "Sebastian",
                  name2: "August",
                  name3: "Franciszek",
                  children: [
                    { name: "Alex" },
                    { name: "Stasio" },
                    {
                      name: "Paulina",
                      children: [{ name: "Kuba" }, { name: "Kacper" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Zadanie 7 bez ***b - tutaj mocno musiałem wspomóc się Internetem..."

const namesArr = [];
const namesFunction = function names(arr) {
  for (let key in arr) {
    if (typeof arr[key] === "object") {
      names(arr[key]);
    } else {
      namesArr.push(arr[key]);
    }
  }
};

namesFunction(nestedObject);
console.log(namesArr);
