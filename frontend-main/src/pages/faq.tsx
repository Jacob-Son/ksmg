import Head from 'next/head';
import { useRouter } from 'next/router';
import { LayoutCSS } from 'src/components/mypage/Mypage.styles';
import Supports from 'src/components/supports/Supports';
import useFaq from 'src/hooks/faq/useFaq';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';

export default function FaqPage() {
  const title = 'FAQ';
  const router = useRouter();
  const { query } = router;
  const { returnPath } = query;
  const { faqList, isPending } = useFaq();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout
        css={LayoutCSS}
        title={title}
        onClickPrev={() => {
          if (returnPath) {
            router.push(returnPath as string);
          } else {
            router.back();
          }
        }}
      >
        {!isPending && (
          <Supports
            title="FAQ"
            description="만약 원하시는 답변이 FAQ에 없다면, 피카펜 카카오톡 채널을 통해 문의해 주세요."
            returnUrl="/faq"
            showDate={false}
            data={faqList}
            contentTextColor={color.text.secondary}
          />
        )}
      </Layout>
    </>
  );
}
