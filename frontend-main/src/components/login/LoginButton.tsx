import React from 'react';

function LoginButton({
  logo,
  onClick,
  backgroundColor,
  textColor,
  borderColor,
  text,
}: {
  logo: string;
  onClick: () => void;
  backgroundColor: string;
  textColor: string;
  text: string;
  borderColor?: string;
}) {
  return (
    <button
      css={{
        width: '100%',
        height: '58px',
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: borderColor ? borderColor : backgroundColor,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        cursor: 'pointer',
        fontFamily: 'Pretendard',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '110%',
        letterSpacing: '-0.165px',
      }}
      onClick={onClick}
    >
      <img
        src={logo}
        width={30}
        height={30}
        css={{
          width: '30px',
          height: '30px',
        }}
      />
      <span>{text}</span>
    </button>
  );
}

export default LoginButton;
