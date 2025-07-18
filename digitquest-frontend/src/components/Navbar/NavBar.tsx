import { useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Gamepad2, 
  BarChart3, 
  Search, 
  Settings, 
  History,
  Plus 
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}


import { createPortal } from 'react-dom';
import { useState } from 'react';

const NavBar = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const location = useLocation();
    const navigate = useNavigate();

    const handleMouseEnter = (itemId: string, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            x: rect.right + 8,
            y: rect.top + rect.height / 2
        });
        setHoveredItem(itemId);
    };

        const menuItems: MenuItem[] = [
        { id: 'home', label: 'Accueil', path: '/', icon: Home },
        { id: 'puzzle', label: 'Puzzle', path: '/puzzle', icon: Gamepad2 },
        // { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
        // { id: 'solutions', label: 'Solutions', path: '/solutions', icon: Search },
        // { id: 'history', label: 'Historique', path: '/history', icon: History },
        // { id: 'settings', label: 'Paramètres', path: '/settings', icon: Settings },
    ];
        
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <>
            <div className="fixed z-1 top-0 left-0 h-screen w-28 m-0 flex flex-col bg-navbarPrimary text-white shadow-lg justify-around items-center">
                {/* Logo */}
                <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center mb-4 mt-4">
                    <span className="text-2xl">🧩</span>
                </div>

                {/* Menu Items */}
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavigation(item.path)}
                            onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                            onMouseLeave={handleMouseLeave}
                            className={`
                                group relative w-12 h-12 rounded-xl flex items-center justify-center 
                                transition-all duration-200 hover:scale-110 mb-2
                                ${isActive 
                                    ? 'bg-white/30 text-gray-800 shadow-lg scale-110' 
                                    : 'bg-white/10 text-gray-600 hover:bg-white/20'
                                }
                            `}
                            title={item.label}
                        >
                            <Icon size={24} />
                        </button>
                    );
                })}

                <div className="flex-1"></div>
            </div>

            {/* Tooltip via Portal */}
            {hoveredItem && createPortal(
                <div 
                    className="fixed bg-gray-800 text-white px-2 py-1 rounded text-sm pointer-events-none whitespace-nowrap z-[9999]"
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y - 12}px`,
                    }}
                >
                    {menuItems.find(item => item.id === hoveredItem)?.label}
                </div>,
                document.body
            )}
        </>
    );
};

export default NavBar;