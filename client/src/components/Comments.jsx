import React, { useRef } from 'react';
import styled from 'styled-components';
import { Color_1 } from '../styles/common';
import Comment from './Comment';

const Container = styled.section`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const CommentList = styled.ul`
  padding: 20px;
  margin-bottom: 20px;
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
  border-top: 1px solid ${({ theme }) => theme.line};
  background-color: transparent;
`;

const CommentSubmit = styled.button`
  width: 64px;
  color: ${Color_1};
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.line};
  background-color: transparent;
`;

const Comments = ({ comments, handleSubmit, handleEdit, handleDelete }) => {
  const inputRef = useRef();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    handleSubmit(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <Container>
      <CommentList>
        {comments.length ? (
          comments.map((comment) => (
            <Comment
              comment={comment}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={comment.id}
            />
          ))
        ) : (
          <div>아직 보여줄 댓글이 없네요</div>
        )}
      </CommentList>
      {/* // ToDo 로그인한 사용자만 댓글을 달 수 있도록 변경하기 */}
      <CommentForm>
        <CommentInput ref={inputRef} placeholder="댓글을 입력해주세요" />
        <CommentSubmit type="submit" onClick={onHandleSubmit}>
          확인
        </CommentSubmit>
      </CommentForm>
    </Container>
  );
};

export default Comments;
