import React from 'react';
// Simulação de Link, já que 'react-router-dom' não está disponível em um único arquivo de visualização, 
// mas mantemos o nome 'Link' para demonstrar a estrutura de roteamento.
const Link = ({ to, children }) => <a href={`#/${to}`} className="menu-link">{children}</a>;

/**
 * Componente Menu de Navegação com Tema F1
 * Utiliza classes CSS definidas em src/styles/_menu.scss
 */
export function Menu() {
    
    const menuItems = [
        { name: 'Pilotos', route: 'pilotos', icon: '👤' },
        { name: 'Equipes', route: 'equipes', icon: '🏎️' },
        { name: 'Fabricantes', route: 'fabricantes', icon: '⚙️' },
        { name: 'Quizz', route: 'quizz', icon: '❓' },
    ];

    return (
        // A classe 'menu' será estilizada pelo SCSS
        <div className='menu'>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.route}>
                        {/* A tag 'a' dentro do 'Link' recebe a classe 'menu a' do SCSS */}
                        <Link to={item.route}>
                            <figure>
                                {/* O emoji do ícone agora está dentro de um div simples para ser estilizado */}
                                <div>
                                    {item.icon}
                                </div>
                                <figcaption>
                                    {item.name}
                                </figcaption>
                            </figure>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
