import React from 'react';
import { useRouter } from 'next/router';
import {
  CategoryListCSS,
  MenuContainerCSS,
  MenuSectionCSS,
  ThemeListCSS,
} from './VerticalMenu.styles';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import ChevronDownIcon from 'src/icons/ChevronDownIcon';

interface IVerticalMenuProps {
  categories: {
    name: string;
    children: string[];
  }[];
}

export default function VerticalMenu(props: IVerticalMenuProps) {
  const router = useRouter();
  const [showThemes, setShowThemes] = React.useState(true);
  const currentCategory = router.query.category
    ? String(router.query.category)
    : '전체';
  const currentTheme = router.query.theme ? String(router.query.theme) : '전체';

  return (
    <div css={MenuSectionCSS}>
      <div css={MenuContainerCSS}>
        <ul css={CategoryListCSS}>
          {props.categories.map((category) => (
            <li key={`category_${category.name}`}>
              <div
                css={css({
                  height: 52,
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  justifyContent: 'space-between',
                  background: '#fff',
                  cursor: 'pointer',
                })}
                onClick={() => {
                  if (category.name === currentCategory) {
                    setShowThemes((state) => !state);
                  } else {
                    setShowThemes(true);
                    router.push({
                      query: {
                        ...(router.query.keyword && {
                          keyword: router.query.keyword,
                        }),
                        category:
                          category.name !== '전체' ? category.name : undefined,
                      },
                    });
                  }
                }}
              >
                <p
                  css={css({
                    ...(category.name === currentCategory && {
                      color: color.purple,
                    }),
                  })}
                >
                  {category.name}
                </p>
                {category.children.length > 0 && (
                  <div
                    css={css({
                      height: 24,
                      transition: 'transform 0.3s ease-in-out',
                      ...(showThemes &&
                        category.name === currentCategory && {
                          transform: 'rotate(180deg)',
                        }),
                    })}
                  >
                    <ChevronDownIcon />
                  </div>
                )}
              </div>
              {category.children.length > 0 && (
                <div
                  css={[
                    ThemeListCSS,
                    css({
                      transition: 'opacity 0.3s ease-in-out',
                      opacity:
                        category.name === currentCategory && showThemes ? 1 : 0,
                    }),
                  ]}
                >
                  <p
                    css={css({
                      transition: 'margin-top 0.3s ease-in-out',
                      marginTop:
                        category.name === currentCategory && showThemes
                          ? 0
                          : '-400%',
                    })}
                  >
                    주제
                  </p>
                  <ul>
                    {category.children.map((theme) => (
                      <li
                        key={`theme_${category.name}_${theme}`}
                        aria-current={theme === currentTheme}
                        onClick={() => {
                          router.push({
                            query: {
                              ...router.query,
                              category: category.name,
                              theme: theme !== '전체' ? theme : undefined,
                            },
                          });
                        }}
                      >
                        <p>- {theme}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
