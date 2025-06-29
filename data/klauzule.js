// sampleClauses.js
// Przykładowe klauzule prawne do pliku JS

export const klauzule = {
  clauses: [
    {
      id: "clause-0",
      title: "Przedmiot umowy",
      items: [
        {
          text:
            "Przedmiotem niniejszej umowy jest świadczenie usług prawnych w ramach wsparcia bieżącej obsługi prawnej w sprawach związanych z działalnością Zamawiającego.",
        },
        {
          text: "Świadczenie usług prawnych będzie obejmowało w szczególności:",
          subpoints: [
            "bieżące doradztwo prawne",
            "sporządzanie regulaminów, polityk, uchwał oraz podobnych dokumentów zgodnie z założeniami przedstawionymi przez Klienta",
            "sporządzenie projektów umów zgodnie z przedstawionymi przez Klienta założeniami"
          ]
        },
        {
          text:
            "Kancelaria oświadcza, że dysponuje odpowiednimi uprawnieniami, kwalifikacjami oraz potencjałem, w szczególności kadrowym oraz organizacyjno-technicznym, a także wiedzą i doświadczeniem niezbędnymi do należytego wykonania niniejszej umowy.",
        }
      ]
    },
    {
      id: "clause-1",
      title: "Czas trwania umowy",
      items: [
        {
          text:
            "Niniejsza umowa zostaje zawarta na czas nieokreślony. Pomoc prawna będzie świadczona przez Kancelarię w ramach poszczególnych zleceń, w zależności od zapotrzebowania Klienta.",
          select: {
            name: "duration",
            options: [
              { value: "nieokreslony", label: "czas nieokreślony", selected: true },
              { value: "1rok", label: "czas określony – 1 rok" },
              { value: "2lata", label: "czas określony – 2 lata" },
              { value: "individ", label: "okres indywidualnie ustalony" }
            ]
          }
        }
      ]
    },
    {
      id: "clause-2",
      title: "Obowiązki stron",
      items: [
        {
          text:
            "W ramach wykonywania przedmiotu Umowy, Kancelaria zobowiązuje się w szczególności do:",
          subpoints: [
            "świadczenia usług pomocy prawnej przy zachowaniu należytej staranności, wynikającej z wiedzy prawniczej, zasad etyki oraz zawodowego charakteru prowadzonej działalności",
            "świadczenia usług pomocy prawnej we współpracy z Klientem oraz zgodnie z wymogami Klienta i wzajemnymi ustaleniami, w tym przestrzegania ustalonych terminów"
          ]
        },
        {
          text:
            "Kancelaria może wykonywać Umowę przy udziale osób wskazanych w Załączniku nr 1 do Umowy. Kancelaria odpowiada jak za własne działanie lub zaniechanie, za działania lub zaniechania osób, przy pomocy których wykonuje Umowę.",
        }
      ]
    },
    {
      id: "clause-3",
      title: "Definicje",
      items: [
        { text: "Strony oznaczają łącznie: Zamawiającego oraz Wykonawcę." },
        { text: "Usługi oznaczają wszelkie czynności wykonywane przez Wykonawcę na rzecz Zamawiającego w ramach niniejszej Umowy." }
      ]
    },
    {
      id: "clause-4",
      title: "Zakres współpracy",
      items: [
        { text: "W ramach niniejszej Umowy Wykonawca zobowiązuje się do świadczenia usług doradczych w zakresie zarządzania zasobami ludzkimi i organizacji procesów wewnętrznych Zamawiającego." },
        {
          text: "Zakres współpracy obejmuje w szczególności:",
          subpoints: [
            "opracowanie strategii HR i rekrutacyjnej",
            "wdrożenie procedur oceny pracowników",
            "szkolenia z zarządzania zespołem i przywództwa",
            "analizę efektywności procesów wewnętrznych"
          ]
        }
      ]
    },
    {
      id: "clause-5",
      title: "Termin realizacji",
      items: [
        {
          text: "Usługi będą świadczone w okresie:",
          select: {
            name: "projectTerm",
            options: [
              { value: "3miesiace", label: "3 miesiące", selected: true },
              { value: "6miesiecy", label: "6 miesięcy" },
              { value: "individ", label: "okres ustalany indywidualnie" }
            ]
          }
        },
        { text: "Na wniosek Zamawiającego możliwe jest przedłużenie terminu realizacji po uprzednim uzgodnieniu warunków przedłużenia." }
      ]
    },
    {
      id: "clause-6",
      title: "Wynagrodzenie i Płatności",
      items: [
        {
          text: "Wynagrodzenie za realizację usług ustala się na podstawie stawki godzinowej lub ryczałtu miesięcznego:",
          subpoints: [
            "stawka godzinowa: 250 PLN netto za każdą rozpoczętą godzinę",
            "ryczałt miesięczny: 12 000 PLN netto przy pełnym zaangażowaniu"
          ]
        },
        { text: "Płatności będą dokonywane na podstawie faktur VAT wystawianych miesięcznie, w terminie 14 dni od daty ich otrzymania." }
      ]
    },
    {
      id: "clause-7",
      title: "Odpowiedzialność Stron",
      items: [
        { text: "Strony odpowiadają za niewykonanie lub nienależyte wykonanie zobowiązań wynikających z Umowy według przepisów Kodeksu cywilnego." },
        { text: "Wykonawca nie ponosi odpowiedzialności za szkody pośrednie oraz utracone korzyści." }
      ]
    },
    {
      id: "clause-8",
      title: "Poufność",
      items: [
        { text: "Strony zachowują w tajemnicy wszelkie informacje poufne uzyskane w związku z realizacją Umowy." },
        { text: "Obowiązek ten trwa przez okres 5 lat od zakończenia współpracy." }
      ]
    },
    {
      id: "clause-9",
      title: "Siła Wyższa",
      items: [
        { text: "Żadna ze Stron nie ponosi odpowiedzialności za niewykonanie zobowiązań spowodowane zdarzeniami losowymi siła wyższa." },
        { text: "Strona dotknięta siłą wyższą powiadomi niezwłocznie drugą Stronę o zaistniałej sytuacji." }
      ]
    },
    {
      id: "clause-10",
      title: "Rozwiązanie Umowy",
      items: [
        { text: "Umowa może być rozwiązana za porozumieniem Stron w dowolnym momencie." },
        { text: "Wypowiedzenie wymaga formy pisemnej pod rygorem nieważności." }
      ]
    },
    {
      id: "clause-11",
      title: "Ochrona Danych Osobowych",
      items: [
        { text: "Strony zobowiązują się przestrzegać przepisów RODO dotyczących przetwarzania danych osobowych." },
        { text: "Wykonawca wdroży środki techniczne i organizacyjne zapewniające bezpieczeństwo danych." }
      ]
    },
    {
      id: "clause-12",
      title: "Postanowienia Końcowe",
      items: [
        { text: "Zmiany Umowy wymagają formy pisemnej pod rygorem nieważności." },
        { text: "W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu cywilnego." }
      ]
    }
  ]
};
