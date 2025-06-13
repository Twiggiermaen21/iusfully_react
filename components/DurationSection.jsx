export default function DurationSection() {
  return (
    <>
      <h1 className="card-heading">Czas trwania umowy</h1>
      <span>
        Niniejsza umowa zostaje zawarta na{' '}
        <select className="duration-select" defaultValue="nieokreslony">
          <option value="nieokreslony">czas nieokreślony</option>
          <option value="1rok">czas określony – 1 rok</option>
          <option value="2lata">czas określony – 2 lata</option>
          <option value="individ">okres indywidualnie ustalony</option>
        </select>
        . Pomoc prawna świadczona będzie na zlecenie Klienta.
      </span>
    </>
  );
}
