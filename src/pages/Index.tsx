import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Command {
  id: string;
  icon: string;
  label: string;
  category: string;
}

const commands: Command[] = [
  { id: 'reminder', icon: 'Bell', label: 'Напоминание', category: 'Уведомления' },
  { id: 'music', icon: 'Music', label: 'Музыка', category: 'Медиа' },
  { id: 'browser', icon: 'Globe', label: 'Браузер', category: 'Интернет' },
  { id: 'files', icon: 'FolderOpen', label: 'Файлы', category: 'Система' },
  { id: 'apps', icon: 'AppWindow', label: 'Программы', category: 'Система' },
  { id: 'volume', icon: 'Volume2', label: 'Громкость', category: 'Настройки' },
  { id: 'brightness', icon: 'Sun', label: 'Яркость', category: 'Настройки' },
  { id: 'power', icon: 'Power', label: 'Питание', category: 'Система' },
];

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [characterName, setCharacterName] = useState('Аи-тян');
  const [showCustomize, setShowCustomize] = useState(false);

  const handleCommand = (command: Command) => {
    toast.success(`${command.label} активирован!`, {
      description: `Выполняю команду: ${command.label}`,
    });
  };

  const handleVoiceCommand = () => {
    if (!isListening) {
      setIsListening(true);
      toast.info('Слушаю...', {
        description: 'Говорите команду',
      });
      setTimeout(() => {
        setIsListening(false);
        if (voiceInput) {
          toast.success('Команда получена!', {
            description: voiceInput,
          });
          setVoiceInput('');
        }
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.1),transparent_50%)]" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Помощник
            </h1>
            <p className="text-muted-foreground mt-2">Твой персональный ассистент для ПК</p>
          </div>
          
          <Button
            variant="outline"
            className="glow"
            onClick={() => setShowCustomize(!showCustomize)}
          >
            <Icon name="Settings" className="mr-2" size={18} />
            Кастомизация
          </Button>
        </div>

        {showCustomize && (
          <Card className="p-6 mb-8 animate-slide-up bg-card/50 backdrop-blur-lg border-primary/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Icon name="Sparkles" className="mr-2" />
              Настройки персонажа
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Имя помощника</label>
                <Input
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Введите имя"
                  className="bg-background/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Icon name="Palette" className="mr-2" size={18} />
                  Цвет волос
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Shirt" className="mr-2" size={18} />
                  Наряд
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 animate-fade-in bg-card/50 backdrop-blur-lg border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Голосовые команды</h2>
                <Badge variant={isListening ? "default" : "secondary"} className="animate-pulse-glow">
                  {isListening ? 'Слушаю' : 'Готова'}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={voiceInput}
                    onChange={(e) => setVoiceInput(e.target.value)}
                    placeholder="Введите команду или нажмите на микрофон..."
                    className="bg-background/50"
                    disabled={isListening}
                  />
                  <Button
                    size="icon"
                    className={`glow ${isListening ? 'animate-pulse-glow' : ''}`}
                    onClick={handleVoiceCommand}
                  >
                    <Icon name={isListening ? "Mic" : "MicOff"} size={20} />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="font-handwriting text-lg text-primary">
                    💜 Привет! Я {characterName}, твой помощник!
                  </p>
                  <p className="mt-2">
                    Попробуй сказать: "Создай напоминание", "Открой браузер", "Поставь музыку"
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in bg-card/50 backdrop-blur-lg border-primary/20">
              <h2 className="text-2xl font-semibold mb-6">Быстрые команды</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {commands.map((cmd, idx) => (
                  <Button
                    key={cmd.id}
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2 hover:glow transition-all"
                    onClick={() => handleCommand(cmd)}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <Icon name={cmd.icon as any} size={24} className="text-primary" />
                    <span className="font-medium">{cmd.label}</span>
                    <span className="text-xs text-muted-foreground">{cmd.category}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex items-end justify-end">
            <div className="relative">
              <Card 
                className={`p-6 bg-card/80 backdrop-blur-lg border-primary/30 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isExpanded ? 'w-96' : 'w-72'
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
                
                <div className="space-y-4">
                  <img
                    src="https://cdn.poehali.dev/projects/9b71de43-33e2-422b-942e-fbdc535266af/files/48b59356-3d56-466f-9f7d-e65f6cead9a8.jpg"
                    alt="AI Character"
                    className="w-full rounded-lg animate-float"
                  />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{characterName}</h3>
                      <Icon name="Sparkles" className="text-primary animate-pulse-slow" />
                    </div>
                    
                    {isExpanded && (
                      <div className="space-y-2 animate-fade-in">
                        <p className="text-sm text-muted-foreground font-handwriting text-lg">
                          Чем могу помочь? ✨
                        </p>
                        
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            <Icon name="Heart" size={12} className="mr-1" />
                            Активна
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Icon name="Zap" size={12} className="mr-1" />
                            Быстрый отклик
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <Button size="sm" variant="ghost" className="h-8">
                            <Icon name="Volume2" size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8">
                            <Icon name="MessageCircle" size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8">
                            <Icon name="Settings" size={14} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                Нажми для взаимодействия
              </div>
            </div>
          </div>
        </div>

        <Card className="mt-8 p-6 animate-fade-in bg-card/50 backdrop-blur-lg border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Последние действия</h2>
          <div className="space-y-3">
            {[
              { time: '14:23', action: 'Создано напоминание "Встреча"', icon: 'Bell' },
              { time: '13:45', action: 'Открыт браузер - Google', icon: 'Globe' },
              { time: '12:30', action: 'Запущена программа VS Code', icon: 'AppWindow' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
              >
                <Icon name={item.icon as any} className="text-primary" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
