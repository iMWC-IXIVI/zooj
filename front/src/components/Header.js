import React from "react";

function Header({className}) {
  return (
    <header className={className}>
      <div>
        logo
        <nav>
          <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
