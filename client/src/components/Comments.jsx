import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { Color_4 } from '../styles/common';

const CommentContainer = styled.section`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const CommentList = styled.ul`
  padding: 20px;
  margin-bottom: 20px;
`;

const Comment = styled.li`
  display: flex;
  font-size: 15px;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-weight: ${({ weight }) => (weight ? weight : 400)};
  margin-right: 6px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  color: ${Color_4};
  background-color: transparent;
`;

const CommentForm = styled.form`
  display: flex;
  width: 100%;
  height: 42px;
  justify-content: center;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 0 12px;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const CommentSubmit = styled.button`
  width: 64px;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Comments = ({ comments }) => {
  return (
    <CommentContainer>
      <CommentList>
        <Comment>
          <Left>
            <Text weight="bold">이름</Text>
            <Text>댓글내용</Text>
            <Button>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button>
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          </Left>
          <Right>
            <Text>날짜</Text>
          </Right>
        </Comment>
      </CommentList>
      <CommentForm>
        <CommentInput placeholder="댓글을 입력해주세요" />
        <CommentSubmit>확인</CommentSubmit>
      </CommentForm>
    </CommentContainer>
  );
};

export default Comments;
