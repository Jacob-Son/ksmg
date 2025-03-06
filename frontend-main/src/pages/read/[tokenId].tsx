import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BookReader from 'src/components/reader/BookReader';
import useAccount from 'src/hooks/common/useAccount';
import useBook from 'src/hooks/reader/useBook';
import { useNotesStore } from 'src/stores/notes/notes.store';
import { color } from 'src/styles/colors';

export default function ReadEBookPage() {
  const { resetNotesStore } = useNotesStore((state) => ({
    resetNotesStore: state.resetNotesStore,
  }));
  const router = useRouter();
  const collectionAddress = '0xtest';
  const { address } = useAccount();
  const { tokenId } = router.query;
  const { book } = useBook(collectionAddress, String(tokenId), address);

  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    document.addEventListener('keyup', async(e) => {
      //console.log('e.key : ' + e.key);
      //console.log('OS Check : ' + navigator.userAgent);
      //console.log('navigator.clipboard : ' + navigator.clipboard);
      
      if(e.key === "PrintScreen") {
        let clipboardItems = await navigator.clipboard.read();
        if (clipboardItems.length > 0) {
          for(const clipboardItem of clipboardItems) {
            for(const type of clipboardItem.types) {
              if (type === "image/png") {
                clipboardItems = undefined;
                //console.log('clipboardItems >>>>>>>   ' + clipboardItems);
                alert('작품을 캡쳐한 스크린샷을 온/오프라인에 유포/공유 할 경우 법적인 제재를 받을 수 있습니다.');
                  // document.removeEventListener('keyup', async(e) => e.preventDefault());
              }
            }
          }
        }
      }
    });
    return () => {
      document.removeEventListener('keyup', async(e) => e.preventDefault());
    };
  }, []);

  //useEffect(() => {
      // focus in 이벤트 테스트
    //window.addEventListener("focus", function() {
      //console.log('focus-in');
      //document.getElementById("bookDiv").style="";
    //}, false);
    // return () => {
    //   document.removeEventListener('focus', function());
    // };
  //}, []);

    //useEffect(() => {
    // focus out 이벤트 테스트
    //window.addEventListener("blur", function() {
      //console.log('focus-out');
      //document.getElementById("bookDiv").style="filter: blur(5px); -webkit-filter: blur(5px);";
    //});
    // return () => {
    //   document.removeEventListener('blur', function());
    // };
  //}, []);

  useEffect(() => {
    return () => resetNotesStore();
  }, []);

  useEffect(() => {
    if (book === null) {
      router.push('/');
    }
  }, [book]);

  return (
    <>
      <Head>
        {book && <title>{book.title}</title>}
        <style>
          {`
            body {
              background: ${color.background.default} !important;
            }
          `}
        </style>
      </Head>
      {book && (
        <BookReader
          bookId={book?.bookId}
          title={book?.title}
          bookImageList={book?.bookImages}
          totalPage={book?.maxPageNumber}
          audioUrl={book?.fullAudioPath}
          current={current}
          setCurrent={setCurrent}
        />
      )}
    </>
  );
}
