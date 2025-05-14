import React, { useEffect, useRef, useState } from 'react';
import {
  BookCSS,
  BookReaderWrapperCSS,
  CopyrightWarningCSS,
  NoteSectionCSS,
} from './BookReader.styles';
import { settings } from './BookReader.constants';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Navbar from './Navbar/Navbar';
import Notes from './Notes/Notes';
import Header from './Header/Header';
import { NotesWrapperCSS } from './Notes/Notes.styles';
import { useNotesStore } from 'src/stores/notes/notes.store';
import { encodeArticleURL } from 'src/utils/file';

export default function BookReader({
  bookId,
  title,
  totalPage,
  bookImageList,
  audioUrl,
  current,
  setCurrent,
}: {
  bookId: number;
  title: string;
  totalPage: number;
  bookImageList: string[];
  audioUrl?: string;
  current: number;
  setCurrent: (val: number) => void;
}) {
  const { isLargeTablet, isDesktop } = useResponsive();
  const { isNoteEditing, isNoteVisible, setIsNoteVisible } = useNotesStore(
    (state) => ({
      isNoteEditing: state.isEditing,
      isNoteVisible: state.isNoteVisible,
      setIsNoteVisible: state.setIsNoteVisible,
    }),
  );
  const [zoom, setZoom] = useState(1);
  const [mouseX, setMouseX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isPageMoved, setIsPageMoved] = useState(false);

  const isAnimationActiveRef = useRef(true);
  const hideNoteWhilePageMove = () => {
    if (isNoteVisible) {
      setIsNoteVisible(false);

      setTimeout(() => {
        setIsNoteVisible(true);
      }, settings.animation.duration);
    }
  };

  const throttledSetCurrent = (val: number) => {
    if (isAnimationActiveRef.current) {
      setCurrent(val);
      isAnimationActiveRef.current = false;

      setTimeout(() => {
        isAnimationActiveRef.current = true;
      }, settings.throttle);
    }
  };

  const step = isLargeTablet || isDesktop ? 2 : 1;

  const onMoveStart = (posX: number) => {
    setMouseX(posX);
    setIsDragging(true);
  };
  const onMove = (posX: number) => {
    if (zoom > 1 || isPageMoved) return; // zoom-in 되었을 경우 page 이동 방지
    if (posX - mouseX >= 50 && current > 0) {
      setIsPageMoved(true);
      throttledSetCurrent(current - step);
    }
    if (posX - mouseX <= -50 && current < totalPage - step) {
      setIsPageMoved(true);
      throttledSetCurrent(current + step);
    }
  };
  const onMoveEnd = () => {
    setIsPageMoved(false);
    setIsDragging(false);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onMoveStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onMove(e.changedTouches[0].clientX);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onMoveStart(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // 마우스 클릭한 상태(드래그)에서만 이벤트 호출
    if (isDragging) onMove(e.clientX);
  };
  const clickPageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    let pageMoveBoundary = 0.26;
    if (isLargeTablet || isDesktop) pageMoveBoundary = 0.2;
    const posX = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
    if (posX <= pageMoveBoundary && current > 0) {
      setCurrent(current - step);
    }
    if (posX >= 1 - pageMoveBoundary && current < totalPage - step) {
      setCurrent(current + step);
    }
  };

  useEffect(() => {
    if (isDesktop) {
      setIsNavbarVisible(true);
    }
    setIsAnimationActive(false);
    setTimeout(() => {
      setIsAnimationActive(true);
    }, 1000);
  }, [isLargeTablet, isDesktop]);

  const navbar = (
    <Navbar
      current={current}
      step={step}
      total={totalPage}
      isShow={isNavbarVisible}
      audioUrl={audioUrl}
      setCurrent={(val) => {
        if (val >= 0 && val < totalPage) setCurrent(val);
      }}
      onPrev={() => {
        if (current > 0) {
          setCurrent(current - step);
          hideNoteWhilePageMove();
        }
      }}
      onNext={() => {
        if (current < totalPage - step) {
          setCurrent(current + step);
          hideNoteWhilePageMove();
        }
      }}
      zoom={zoom}
      onZoomOut={() => {
        if (zoom > 1) setZoom(zoom - 0.5);
      }}
      onZoomIn={() => {
        if (zoom < 5) setZoom(zoom + 0.5);
      }}
    />
  );

  return (
    <>
      <Header title={title}>{isDesktop && navbar}</Header>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        css={[
          BookReaderWrapperCSS,
          {
            width: `${100}vw`,
            height: `${100}vh`,
            transform: `scale(${zoom})`,
            transformOrigin: '0% 0%',
            transition: 'transform 0.9s ease-in-out',
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          !isNavbarVisible && setIsNavbarVisible(!isNavbarVisible);
          clickPageMove(e);
        }}
      >
        <div
          className="book"
          css={BookCSS(isAnimationActive)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={onMoveEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={onMoveEnd}
          onClick={(e) => {
            e.stopPropagation();
            !isNavbarVisible && setIsNavbarVisible(!isNavbarVisible);
            clickPageMove(e);
          }}
        >
          {!isDesktop && !isLargeTablet
            ? Array.from({ length: totalPage })
                .fill(0)
                .map((_, i) => {
                  if (Math.abs(current - i) > 6) return null;
                  const pageStatus = (() => {
                    if (i === current) return 'current';
                    else if (i < current) return 'read';
                    return 'unread';
                  })();
                  return (
                    <div
                      key={`book-page-${i}`}
                      className="book__page"
                      page-status={pageStatus}
                      css={{ zIndex: -i }}
                    >
                      <img
                        src={encodeArticleURL(bookImageList[i])}
                        alt={`page ${i}`}
                        css={{
                          width: '100%',
                          height: '100%',
                          userSelect: 'none',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  );
                })
            : Array.from({ length: totalPage })
                .fill(0)
                .map((_, i) => {
                  if (Math.abs(current - i) > 6) return null;
                  const pageStatus = (() => {
                    if (i === current || i === current + 1) return 'current';
                    else if (i < current + 2) return 'read';
                    return 'unread';
                  })();
                  const pagePosition = i % 2 === 0 ? 'left' : 'right';
                  return (
                    <div
                      key={`book-page-${i}`}
                      className={`book__page book__page--${pagePosition}`}
                      page-status={pageStatus}
                      css={{ zIndex: -i, position: 'relative' }}
                    >
                      <div
                        css={{
                          left: pagePosition === 'left' ? 'unset' : 0,
                          right: pagePosition === 'right' ? 'unset' : 0,
                          background:
                            pagePosition === 'left'
                              ? 'linear-gradient(to left, #b9b8af32, transparent)'
                              : 'linear-gradient(to right, #a2a2a23e, transparent)',
                          position: 'absolute',
                          top: 0,
                          width: '6%',
                          height: '100%',
                        }}
                      />

                      <img
                        src={encodeArticleURL(bookImageList[i])}
                        alt={`page ${i}`}
                        css={{
                          width: '100%',
                          height: '100%',
                          userSelect: 'none',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  );
                })}
          <p css={CopyrightWarningCSS}>
            (경고) 해당 상품의 화면 캡처나 복제와 <br />
            시 낭송 녹음과 전송은 <br />
            저작권법에 위배됩니다.
          </p>
        </div>
      </div>
      <div
        css={[
          NoteSectionCSS(zoom),
          {
            ...(!isNoteVisible && { display: 'none' }),
          },
        ]}
      >
        <div css={NotesWrapperCSS(isNoteEditing, zoom)}>
          <Notes
            zoom={zoom}
            currentPage={current}
            position="left"
            bookId={bookId}
          />
          {(isLargeTablet || isDesktop) && current + 1 < totalPage && (
            <Notes
              zoom={zoom}
              currentPage={current + 1}
              position="right"
              bookId={bookId}
            />
          )}
        </div>
      </div>
      {!isDesktop && navbar}
    </>
  );
}
