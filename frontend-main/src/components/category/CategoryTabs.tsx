import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { mq } from 'src/styles/mediaQuery';
import CategoryGrid from 'src/components/category/CategoryGrid'; // ✅ Grid 컴포넌트

const categories = [
  { id: '건강기능식품', name: '건강기능식품' },
  { id: '간편식품', name: '간편식품' },
  { id: '커피/음료', name: '커피/음료' },
];

export default function CategoryTabs({ products }) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts([]); // ✅ 이전 데이터 초기화
  
    const newFilteredProducts = products
      .filter(
        (product) =>
          product.category?.toLowerCase() === activeCategory.toLowerCase()
      )
      .filter((product, index, self) => 
        index === self.findIndex((p) => p.nftId === product.nftId) // ✅ 중복 제거
      );
  
    console.log("Filtered Products for", activeCategory, ":", newFilteredProducts);
  
    setFilteredProducts([...newFilteredProducts]); // ✅ 새로운 데이터 설정 (초기화 후 할당)
  }, [activeCategory, products]);

  console.log("Active Category:", activeCategory);
  console.log("Filtered Products:", filteredProducts);

  return (
    <div css={containerStyle}>
      {/* 탭 버튼 */}
      <div css={tabContainer}>
        {categories.map((category) => (
          <button
            key={category.id}
            css={[tabButton, activeCategory === category.id && activeTab]}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 상품이 있을 때만 렌더링 / 없으면 메시지 출력 */}
      {filteredProducts.length > 0 ? (
        <CategoryGrid
          key={`category_grid_${activeCategory}`} // ✅ key 중복 문제 해결
          name={categories.find((c) => c.id === activeCategory)?.name}
          data={filteredProducts}
        />
      ) : (
        <p css={noProductsMessage}>현재 선택된 카테고리에 상품이 없습니다.</p>
      )}
    </div>
  );
}

// ✅ 스타일 수정
const containerStyle = css({
  margin: '40px 0',
  padding: '0 24px',
  borderBottom: '2px solid #ddd', // ✅ 구분선 추가
  paddingBottom: '20px', // ✅ 구분선과 콘텐츠 간 간격 조정
  [mq.mobile]: {
    margin: '0px 0',
  },
});

const tabContainer = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  borderBottom: '2px solid #ddd',
  paddingBottom: '20px',
  marginBottom: '20px'
});

const tabButton = css({
  background: 'transparent',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '10px 20px',
  color: '#777',
  fontWeight: '500',
  '&:hover': { color: '#333' },
});

const activeTab = css({
  color: '#000',
  fontWeight: 'bold',
  borderBottom: '2px solid #000',
});

const noProductsMessage = css({
  textAlign: 'center',
  color: '#888',
  marginTop: '20px',
});