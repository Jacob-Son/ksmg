import { useRouter } from 'next/router';
import React from 'react';
import {
  CategoriesFlexCSS,
  ThemesFlexCSS,
  VerticalMenuContainerCSS,
} from './MbVerticalCategoryMenu.styles';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import Image from 'next/image';

interface IMbVerticalMenuProps {
  categories: { name: string; children: string[] }[];
  themes: string[];
  notFound?: boolean;
  children?: React.ReactNode;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MbVerticalMenu(props: IMbVerticalMenuProps) {
  const router = useRouter();
  const { category } = router.query;
  const currentCategory = category || 1;
  return (
    <div css={VerticalMenuContainerCSS}>
      <ul css={CategoriesFlexCSS}>
        {props.categories.map((x) => (
          <li
            key={`mb_category_${x.name}`}
            css={css({
              ...(x.name === currentCategory && {
                background: '#fff',
                color: color.text.primary,
              }),
            })}
            onClick={() => {
              if (x.children.length === 0) {
                props.setMobileMenuOpen(false);
              }
              router.push({
                query: {
                  category: x.name,
                },
              });
            }}
          >
            <p>{x.name}</p>
          </li>
        ))}
      </ul>
      {props.notFound ? (
        <>{props.children}</>
      ) : (
        <ul css={ThemesFlexCSS}>
          {props.themes?.map((theme) => (
            <li
              key={`mb_category_${theme}`}
              onClick={() => {
                props.setMobileMenuOpen(false);
                if (theme === '전체') {
                  router.push({
                    query: {
                      category: currentCategory,
                    },
                  });
                  return;
                }
                router.push({
                  query: {
                    category: currentCategory,
                    theme,
                  },
                });
              }}
            >
              <p>{theme}</p>

              <Image
                alt="chevron right icon"
                src="/icons/ic_chevron_right.svg"
                width={24}
                height={24}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
