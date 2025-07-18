import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div 
                className="absolute inset-0"
                style={{
                background: `
                    radial-gradient(ellipse at top right, rgba(199, 210, 254, 0.9) 0%, transparent 90%),
                    radial-gradient(ellipse at bottom, rgba(221, 214, 254, 0.9) 0%, transparent 50%),
                    radial-gradient(ellipse at center, rgba(196, 181, 253, 0.5) 0%, transparent 60%),
                    linear-gradient(135deg, #ffffff 0%, #f1f5f9 30%, #e2e8f0 100%)
                `
                }}
            >
                <div className='h-full w-full z-1 relative'>
                    {children}
                </div>
                <div 
                className="absolute animate-blob-float"
                style={{
                    width: '280px',
                    height: '280px',
                    top: '-60px',
                    right: '-60px',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    opacity: 1,
                    background: `radial-gradient(circle, 
                    rgba(139, 92, 246, 0.6) 10%, 
                    rgba(199, 210, 254, 0.7) 50%, 
                    rgba(167, 139, 250, 0.4) 80%,
                    transparent 85%)`,
                    animationDelay: '0s'
                }}
                />

                {/* Blob 2 - Rose INTENSE (maintenant à gauche) */}
                <div 
                className="absolute animate-blob-float"
                style={{
                    width: '220px',
                    height: '220px',
                    bottom: '-40px',
                    left: '-40px',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    opacity: 0.9,
                    background: `radial-gradient(circle, 
                    rgba(244, 114, 182, 0.55) 0%, 
                    rgba(254, 202, 202, 0.65) 40%, 
                    rgba(251, 146, 200, 0.35) 70%,
                    transparent 85%)`,
                    animationDelay: '8s'
                }}
                />

                {/* Blob 3 - Violet clair INTENSE */}
                <div 
                className="absolute animate-blob-float"
                style={{
                    width: '180px',
                    height: '180px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    opacity: 0.9,
                    background: `radial-gradient(circle, 
                    rgba(168, 85, 247, 0.5) 0%, 
                    rgba(221, 214, 254, 0.6) 40%, 
                    rgba(196, 181, 253, 0.3) 70%,
                    transparent 85%)`,
                    animationDelay: '16s'

                }}
                />

                {/* Blob supplémentaire pour plus de richesse (inversé aussi) */}
                {/* <div 
                className="absolute animate-blob-float"
                style={{
                    width: '150px',
                    height: '150px',
                    top: '20%',
                    left: '20%',
                    borderRadius: '50%',
                    filter: 'blur(50px)',
                    opacity: 0.7,
                    background: `radial-gradient(circle, 
                    rgba(147, 51, 234, 0.4) 0%, 
                    rgba(196, 181, 253, 0.5) 50%,
                    transparent 80%)`,
                    animationDelay: '12s'
                }}
                /> */}
            </div>

            <div className="flex flex-col items-center justify-center h-full">
                {children}
            </div>
        </div>
    );
};