'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypingEffect({
  lines,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 300
}: TypingEffectProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const targetLine = lines[currentLineIndex];

    if (isTyping) {
      if (currentText.length < targetLine.length) {
        const timer = setTimeout(() => {
          setCurrentText(targetLine.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayedLines([...displayedLines, currentText]);
          setCurrentText('');
          setCurrentLineIndex(currentLineIndex + 1);
        }, pauseDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [currentText, currentLineIndex, isTyping, lines, displayedLines, typingSpeed, pauseDuration]);

  return (
    <div className="font-mono text-sm sm:text-base md:text-lg space-y-2">
      {displayedLines.map((line, index) => (
        <div key={index} className="text-green-400">
          {line}
        </div>
      ))}
      {currentLineIndex < lines.length && (
        <div className="text-green-400">
          {currentText}
          <span className="inline-block w-2 h-4 ml-1 bg-green-400 animate-pulse" />
        </div>
      )}
    </div>
  );
}
