import React from 'react';
import { useDeviceDetection } from '@/hooks/UseDeviceDetection';
import { Monitor, Laptop, Smartphone, Tablet } from 'lucide-react';

interface DeviceGuardProps {
  children: React.ReactNode;
}

export const DeviceGuard: React.FC<DeviceGuardProps> = ({ children }) => {
  const { isDesktop, isMobile, isTablet, screenWidth, screenHeight } = useDeviceDetection();
  if (isDesktop) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6 flex justify-center">
          {isMobile && <Smartphone size={64} className="text-red-500" />}
          {isTablet && <Tablet size={64} className="text-orange-500" />}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🖥️ Desktop/Laptop Requis
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Cette application nécessite un écran plus large pour une expérience optimale.
          <br /><br />
          Veuillez utiliser un <strong>ordinateur portable</strong> ou un <strong>ordinateur de bureau</strong>.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500">
            <strong>Résolution actuelle :</strong> {screenWidth}px / {screenHeight}px
            <br />
            <strong>Minimum requis :</strong> 1024px (largeur) 450px (hauteur)
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl transition-colors"
          >
            🔄 Actualiser la page
          </button>
        </div>
      </div>
    </div>
  );
};