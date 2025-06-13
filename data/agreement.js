export const agreement = {
  clauses: [
    {
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
    }
  ]
}
