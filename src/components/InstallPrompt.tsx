import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <Card className="fixed bottom-4 left-4 p-4 max-w-sm animate-slide-up bg-card/95 backdrop-blur-lg border-primary/30 z-50">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon name="Download" className="text-primary" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Установить на рабочий стол</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Получи быстрый доступ к AI помощнику прямо с рабочего стола!
          </p>
          <div className="flex gap-2">
            <Button onClick={handleInstall} size="sm" className="glow">
              <Icon name="Download" className="mr-2" size={16} />
              Установить
            </Button>
            <Button onClick={() => setShowPrompt(false)} size="sm" variant="ghost">
              Позже
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setShowPrompt(false)}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default InstallPrompt;
