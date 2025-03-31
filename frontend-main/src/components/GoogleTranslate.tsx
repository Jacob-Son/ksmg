import React, { useEffect } from 'react';
import { css } from '@emotion/react';

const translateStyles = css`
  /* 전체 컨테이너 스타일 */
  .goog-te-gadget {
    font-family: inherit !important;
    display: flex !important;
    align-items: center !important;
  }

  /* 구글 로고 숨기기 */
  .goog-te-gadget-simple img {
    display: none !important;
  }

  /* "언어 선택" 텍스트 변경 */
  .goog-te-gadget-simple a {
    color: #333 !important;
    text-decoration: none !important;
    font-size: 14px !important;
    position: relative;
    padding-left: 24px !important;
    
    &::before {
      content: "🌐"; /* 아이콘 변경 */
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      padding: 3px, 3px, 3px, 3px
    }

    span:first-child {
      display: none !important; /* 기존 텍스트 숨기기 */
    }

    &::after {
      content: "Select Language"; /* 새 텍스트 */
      display: inline-block;
    }
  }

  /* 드롭다운 화살표 스타일 */
  .goog-te-gadget-simple a span:last-child {
    display: none !important;
  }

  /* 드롭다운 메뉴 스타일 */
  .goog-te-menu-frame {
    box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
    border-radius: 4px !important;
  }
`;

const GoogleTranslate = () => {
  useEffect(() => {
    if (window.google?.translate?.TranslateElement) return;

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'ko',
          includedLanguages: 'en,ar,zh-CN,ja,ms',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    };

    document.body.appendChild(script);

    return () => {
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);

  return (
    <div 
      id="google_translate_element"
      css={translateStyles}
      style={{ display: 'inline-block' }}
    />
  );
};

export default GoogleTranslate;