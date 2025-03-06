import React from 'react';
import {
  ChapterTextStyleCSS,
  ChapterTitleCSS,
  SectionContainerCSS,
} from './Section.styles';
import { COMMITTEE_GREETINGS } from './Chapter4.constants';
import CommitteeCard from 'src/components/project/CommitteeCard';
import { CardColumnCSS, CardFlexCSS } from './Chapter4.styles';

export default function Chapter4() {
  return (
    <div css={SectionContainerCSS}>
      <p css={ChapterTextStyleCSS}>
        Chapter <span>4</span>.
      </p>
      <p css={ChapterTitleCSS}>발간위원회 인사말</p>

      <div css={CardFlexCSS}>
        {COMMITTEE_GREETINGS.map((col, i) => (
          <div key={`committee_greeting_col_${i}`} css={CardColumnCSS}>
            {col.map((x) => (
              <CommitteeCard key={`committee_greeting_${x.name}`} {...x} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
