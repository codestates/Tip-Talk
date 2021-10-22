import React, { useState } from 'react';
import styled from 'styled-components';
import { category } from '../dummy/category';
import { Color_2, Samlib } from '../styles/common';
import { Button } from './Menu';

const CategoryContainer = styled.nav`
  position: fixed;
  top: 320px;
  left: 20px;
  width: 170px;
  font-family: ${Samlib};
  font-size: 30px;
  color: ${({ theme }) => theme.navColor};
  background-color: ${Color_2};
  border-radius: 8px;
  overflow: hidden;
`;

const CategoryList = styled.ul`
  height: 42px;
  text-align: center;
  transition: 0.25s;
  &:hover {
    height: ${({ length }) => length * 42}px;
  }
`;

const NavTitle = styled.h2`
  padding: 6px 0;
`;

const Column = styled.li`
  padding: 6px 0;
  border-radius: 7px;
  transition: 0.2s;
`;

const Category = () => {
  const [categories, setCategories] = useState(category);

  return (
    <CategoryContainer>
      <CategoryList length={categories?.length + 1}>
        <NavTitle>카테고리</NavTitle>
        {categories?.map((category) => (
          <Column key={category.id}>
            <Button>{category.value}</Button>
          </Column>
        ))}
      </CategoryList>
    </CategoryContainer>
  );
};

export default Category;
