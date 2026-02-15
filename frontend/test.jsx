// AppProvider.tsx
import React, { useEffect, useCallback, useRef } from 'react';
import { AppContext } from './AppContext';
import { Channel, User } from './types';

const SOCKET_URL = process.env.REACT_APP_WS_URL || 'http://localhost:3001';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  // Инициализация пользователя и socket
  useEffect(() => {
    const savedUser = localStorage.getItem('messenger_user');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      setUser(parsedUser);
    } else {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: `User${Math.floor(Math.random() * 1000)}`,
        currentChannelId: null
      };
      setUser(newUser);
      localStorage.setItem('messenger_user', JSON.stringify(newUser));
    }

    // Инициализация socket соединения
    const socket = io(SOCKET_URL, {
      query: { userId: user?.id }
    });
    
    socketRef.current = socket;

    // Получение списка каналов
    socket.on('channels:list', (serverChannels: Channel[]) => {
      setChannels(serverChannels);
      
      // Находим канал по умолчанию
      const defaultChannel = serverChannels.find(ch => ch.isDefault);
      
      if (defaultChannel && (!user?.currentChannelId || !serverChannels.find(c => c.id === user.currentChannelId))) {
        // Если у пользователя нет активного канала или его канал был удален
        setActiveChannel(defaultChannel);
        socket.emit('channel:join', defaultChannel.id);
        
        // Обновляем пользователя
        setUser(prev => prev ? { ...prev, currentChannelId: defaultChannel.id } : null);
      }
    });

    // Событие удаления канала
    socket.on('channel:deleted', (deletedChannelId: string) => {
      console.log(`Канал ${deletedChannelId} был удален`);
      
      // Удаляем канал из списка
      setChannels(prev => prev.filter(ch => ch.id !== deletedChannelId));
      
      // Если удаленный канал был активным, переключаемся
      if (activeChannel?.id === deletedChannelId) {
        handleSwitchToDefault();
      }
    });

    // Уведомление о необходимости переключения
    socket.on('channel:switchRequired', (data: { 
      deletedChannelId: string; 
      defaultChannelId: string;
      message: string;
    }) => {
      if (activeChannel?.id === data.deletedChannelId) {
        showNotification(data.message);
        switchToChannel(data.defaultChannelId);
      }
    });

    // Событие присоединения к каналу
    socket.on('channel:joined', (channel: Channel) => {
      setActiveChannel(channel);
      setUser(prev => prev ? { ...prev, currentChannelId: channel.id } : null);
      
      // Сохраняем в localStorage
      const savedUser = localStorage.getItem('messenger_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        localStorage.setItem('messenger_user', JSON.stringify({
          ...parsedUser,
          currentChannelId: channel.id
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  // Поиск канала по умолчанию
  const findDefaultChannel = useCallback((): Channel | undefined => {
    return channels.find(channel => channel.isDefault);
  }, [channels]);

  // Переключение на конкретный канал
  const switchToChannel = useCallback((channelId: string) => {
    if (!socketRef.current) return;

    setIsSwitching(true);
    
    socketRef.current.emit('channel:join', channelId);
    
    // Обновляем локальное состояние
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      setActiveChannel(channel);
    }
    
    setTimeout(() => setIsSwitching(false), 300);
  }, [channels]);

  // Переключение на канал по умолчанию
  const handleSwitchToDefault = useCallback(() => {
    const defaultChannel = findDefaultChannel();
    
    if (defaultChannel) {
      console.log(`Переключаемся на канал по умолчанию: ${defaultChannel.name}`);
      switchToChannel(defaultChannel.id);
      
      // Показываем уведомление
      showNotification(
        `Канал "${activeChannel?.name}" был удален. Вы были перемещены в "${defaultChannel.name}"`
      );
    } else {
      console.error('Канал по умолчанию не найден!');
      // Создаем временный канал или показываем ошибку
    }
  }, [findDefaultChannel, switchToChannel, activeChannel?.name]);

  // Удаление канала
  const deleteChannel = useCallback((channelId: string) => {
    if (!socketRef.current) return;
    
    const channelToDelete = channels.find(ch => ch.id === channelId);
    
    if (!channelToDelete) {
      console.error('Канал не найден');
      return;
    }
    
    if (channelToDelete.isDefault) {
      alert('Невозможно удалить канал по умолчанию');
      return;
    }
    
    // Подтверждение удаления
    if (!window.confirm(`Вы уверены, что хотите удалить канал "${channelToDelete.name}"?`)) {
      return;
    }
    
    // Отправляем запрос на удаление
    socketRef.current.emit('channel:delete', channelId);
    
    // Предварительно обновляем состояние
    setChannels(prev => prev.filter(ch => ch.id !== channelId));
    
    // Если удаляемый канал активный, сразу переключаемся
    if (activeChannel?.id === channelId) {
      handleSwitchToDefault();
    }
  }, [channels, activeChannel?.id, handleSwitchToDefault]);

  // Показать уведомление
  const showNotification = useCallback((message: string) => {
    // Можно использовать toast-библиотеку или кастомное решение
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Мессенджер', { body: message });
    }
    
    // Или просто в консоль для отладки
    console.log('Уведомление:', message);
  }, []);

  const value = {
    channels,
    activeChannel,
    user,
    socket: socketRef.current,
    switchToDefaultChannel: handleSwitchToDefault,
    deleteChannel
  };

  return (
    <AppContext.Provider value={value}>
      {isSwitching && (
        <div className="channel-switch-overlay">
          <div className="switch-spinner"></div>
          <span>Переключение канала...</span>
        </div>
      )}
      {children}
    </AppContext.Provider>
  );
};

// Хук для использования контекста
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};