import React from "react";
import { Link } from "react-router-dom"; // ← IMPORTANTE

export function Menu() {
  const menuItems = [
    { name: "Pilotos", route: "/pilotos", icon: "👤" },
    { name: "Equipes", route: "/equipes", icon: "🏎️" },
    { name: "Fabricantes", route: "/fabricantes", icon: "⚙️" },
    { name: "Quizz / Missões", route: "/missao", icon: "❓" },
    { name: "Inventário", route: "/inventario", icon: "📦" },
    { name: "Câmera & GPS", route: "/camera-gps", icon: "📷" },
  ];

  return (
    <div className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.route}>
            <Link to={item.route} className="menu-link">
              <figure>
                <div>{item.icon}</div>
                <figcaption>{item.name}</figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
