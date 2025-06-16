export default function Header() {
  return (
    <div className="flex-header z-20">
      <div className="logo-container">
        <img src="./images/logo_v5.png" alt="Logo firmy" className="logo" />
      </div>
      <div>
      <a href="scena" className="btn-return">←  </a>
      <a href="/" className="btn-return">→ </a>
      </div>
    </div>
  );
}