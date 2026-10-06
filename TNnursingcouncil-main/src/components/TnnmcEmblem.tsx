import React from 'react';

interface TnnmcEmblemProps {
  className?: string;
  size?: number;
}

/**
 * Nightingale chatbot Logo
 * Renders the official logo asset cleanly and responsively across all screen sizes.
 */
export const TnnmcEmblem: React.FC<TnnmcEmblemProps> = ({
  className = '',
  size = 44,
}) => {
  return (
    <img
      src="/nightingale-logo.png"
      alt="Nightingale chatbot Logo"
      width={size}
      height={size}
      style={{
        width: size ? `${size}px` : undefined,
        height: size ? `${size}px` : undefined,
      }}
      className={`shrink-0 select-none object-contain ${className}`}
    />
  );
};

