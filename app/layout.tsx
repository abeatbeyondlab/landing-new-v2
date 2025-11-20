import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'A Beat Beyond | Digital Transformation Engineered',
  description: 'A Beat Beyond is a...',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className="scroll-smooth">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    display: ['Outfit', 'sans-serif'],
                  },
                  colors: {
                    brand: {
                      dark: '#0B1120', // Deeper, richer dark
                      primary: '#3B82F6',
                      accent: '#06B6D4', // Cyan for electric feel
                      surface: '#1E293B',
                    }
                  },
                  animation: {
                    'float': 'float 6s ease-in-out infinite',
                    'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  },
                  keyframes: {
                    float: {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-20px)' },
                    },
                    'pulse-glow': {
                      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                      '50%': { opacity: .8, transform: 'scale(1.05)' },
                    },
                    'slide-up': {
                      '0%': { transform: 'translateY(40px)', opacity: 0 },
                      '100%': { transform: 'translateY(0)', opacity: 1 },
                    }
                  }
                }
              }
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: smooth; }
            body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
            
            /* Custom scrollbar */
            ::-webkit-scrollbar { width: 10px; }
            ::-webkit-scrollbar-track { background: #0f172a; }
            ::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; }
            ::-webkit-scrollbar-thumb:hover { background: #475569; }

            .glass-panel {
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .text-gradient {
              background: linear-gradient(135deg, #60A5FA 0%, #2DD4BF 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .text-gradient-dark {
              background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          `
        }} />
      </head>
      <body className="bg-slate-50 text-slate-900">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
