import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { bem } from '@/css/bem.ts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import  { Checkbox } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import './Card.css';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const [b, e] = bem('card');

interface BadgeProps {
  isShown: boolean;
  text: ReactNode;
  color?: string;
  onBadgeClick?: (e: React.MouseEvent) => void;
}

interface CardProps {
  title: string;
  subtitle?: string;
  lessonsQty?: number;
  isLearned?: boolean;
  badge?: BadgeProps;
  onClick?: () => void;
  isAccordion?: boolean;
  accordionContent?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isFavorite?: boolean;
  onFavoriteAdd?: () => void;
  onFavoriteRemove?: () => void;
  image?: string;
}

export const Card: FC<CardProps> = ({
  title,
  subtitle,
  lessonsQty,
  isLearned,
  badge,
  onClick,
  isAccordion = false,
  accordionContent,
  isOpen: isOpenControlled,
  onToggle,
  isFavorite,
  onFavoriteAdd,
  onFavoriteRemove,
  image,
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  const isControlled = isOpenControlled !== undefined;
  const isOpen = isControlled ? isOpenControlled : isOpenInternal;

  const handleToggleAccordion = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setIsOpenInternal(!isOpenInternal);
    }
  };

  const handleCardClick = () => {
    if (isAccordion) {
      handleToggleAccordion();
    } else if (onClick) {
      onClick();
    }
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    if (badge?.onBadgeClick) {
      badge.onBadgeClick(e);
    } else if (isAccordion && onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite && onFavoriteRemove) {
      onFavoriteRemove();
    } else if (!isFavorite && onFavoriteAdd) {
      onFavoriteAdd();
    }
  };

  const isPaidContent = badge?.color === '#ff5252';
  const isRecordingContent = badge?.color === '#ff9800';
  const badgeBackgroundColor = isPaidContent
    ? '#ff5252'
    : isRecordingContent
      ? '#ff9800'
      : isOpen && isAccordion
        ? '#23334d'
        : (badge?.color || '#c8e6c9'); 

  return (
    <div
      className={`${b()} ${isOpen ? 'card--open' : ''} ${image ? 'card--with-image' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      {image && (
        <div className={e('image-wrapper')}>
          <img src={image} alt={title} className={e('image')} />
        </div>
      )}
      <div className={e('header')}>
        <div className={e('content')}>
          <div className={e('title')}>
            {isLearned && (
              <Checkbox
                checked={true}
                disabled
                sx={{
                  padding: 0,
                  marginRight: '6px',
                  '&.Mui-checked': {
                    color: '#4ade80',
                  },
                  '&.Mui-disabled': {
                    color: '#4ade80',
                  },
                }}
              />
            )}
            {title}
          </div>
          {lessonsQty !== undefined && (
            <div className={e('lessons-qty')}>уроков: {lessonsQty}</div>
          )}
          <div className={`${e('subtitle')} ${isAccordion ? 'card__subtitle--clickable' : ''}`}>
            {subtitle}
            {isAccordion && subtitle && (
              <KeyboardArrowDownIcon
                className={e('arrow')}
                sx={{
                  fontSize: 20,
                  transition: 'transform 0.3s ease',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: '#666666',
                }}
              />
            )}
          </div>
          {isFavorite && !isOpen && (
            <div className={e('favorite-indicator')}>
              <Favorite sx={{ fontSize: 16, color: '#ff5252' }} />
            </div>
          )}
        </div>
        {isAccordion && !isOpen && (
          <button
            className={e('details-button')}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleAccordion();
            }}
          >
            подробнее
            <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
          </button>
        )}
        {badge?.isShown && (
          <div
            className={`${e('badge-wrapper')} ${onClick || badge.onBadgeClick ? 'card__badge-wrapper--clickable' : ''} ${(onClick || badge.onBadgeClick) && !isPaidContent && !isRecordingContent ? 'card__badge-wrapper--accessible' : ''} ${isPaidContent ? 'card__badge-wrapper--paid' : ''} ${isRecordingContent ? 'card__badge-wrapper--recording' : ''}`}
            onClick={handleBadgeClick}
            style={{ display: 'none' }}
          >
            <div
              className={e('badge')}
              style={{ backgroundColor: badgeBackgroundColor }}
            >
              {badge.text}
            </div>
          </div>
        )}
      </div>
      {isAccordion && (
        <div className={`${e('accordion-content')} ${isOpen ? 'card__accordion-content--open' : ''}`}>
          <div className={e('accordion-inner')}>
            {accordionContent}
            {onClick && (
              <button
                className={`${e('open-button')} ${isPaidContent ? 'card__open-button--paid' : ''} ${isRecordingContent ? 'card__open-button--recording' : ''}`}
                onClick={handleBadgeClick}
              >
                Открыть {isPaidContent ? <LockOutlinedIcon sx={{ fontSize: 18 }} /> : !isRecordingContent && <ArrowForwardIcon sx={{ fontSize: 18 }} />}
              </button>
            )}
            {(onFavoriteAdd || onFavoriteRemove) && (
              <div
                className={`${e('favorite-row')} ${isFavorite ? 'card__favorite-row--active' : ''}`}
                onClick={handleFavoriteClick}
              >
                {isFavorite ? (
                  <>
                    <Favorite sx={{ fontSize: 20, color: '#ff5252' }} />
                    <span className={e('favorite-text')}>В избранном</span>
                    <span className={e('favorite-text-hover')}>Убрать из избранного</span>
                  </>
                ) : (
                  <>
                    <FavoriteBorder sx={{ fontSize: 20, color: '#888' }} />
                    <span className={e('favorite-text')}>Добавить в избранное</span>
                    <span className={e('favorite-text-hover')}>Добавить в избранное</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
