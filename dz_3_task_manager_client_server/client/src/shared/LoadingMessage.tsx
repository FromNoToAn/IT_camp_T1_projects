// shared/LoadingMessage.tsx
import { useEffect, useState } from "react";
import styles from "./LoadingMessage.module.css";

const messages = [
  "Загрузка данных...",
  "Сервер просыпается...",
  "Подождите немного...",
  "Устанавливаем соединение с API...",
  "Это особенности бесплатного тарифа Render...",
];

interface LoadingMessageProps {
  interval?: number;     // интервал смены сообщений
  dotSpeed?: number;     // скорость появления точек (мс)
}

export default function LoadingMessage({ interval = 3000, dotSpeed = 500, }: LoadingMessageProps)
{
  const [dots, setDots] = useState(".");
  const [messageIndex, setMessageIndex] = useState(0);

  // Анимация точек
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, dotSpeed);
    return () => clearInterval(dotInterval);
  }, [dotSpeed]);

  // Смена сообщений
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, interval);
    return () => clearInterval(msgInterval);
  }, [interval]);

  return (
    <div className={styles.loading}>
      {messages[messageIndex]}{dots}
    </div>
  );
}
