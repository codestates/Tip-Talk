import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import { Color_1 } from '../styles/common';
import Comment from './Comment';
import Modal from './Modal';

const Container = styled.section`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
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

const Empty = styled.p`
  text-align: center;
`;

const Comments = ({ comments, handleSubmit, handleEdit, handleDelete }) => {
  const inputRef = useRef();
  const [message, setMessage] = useState(false);
  const [user] = useContext(UserContext);

  const onHandleSubmit = () => {
    handleSubmit(inputRef.current.value);
    inputRef.current.value = '';
  };

  const require = (e) => {
    e.preventDefault();
    if (user) {
      onHandleSubmit();
    } else {
      setMessage(true);
    }
  };

  return (
    <Container>
      {message && <Modal message="로그인이 필요해요" setIsOpen={setMessage} />}
      <CommentList>
        {comments?.length ? (
          comments.map((comment) => (
            <Comment
              comment={comment}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={comment.id}
            />
          ))
        ) : (
          <Empty>아직 보여줄 댓글이 없어요</Empty>
        )}
      </CommentList>
      <CommentForm>
        <CommentInput ref={inputRef} placeholder="댓글을 입력해주세요" />
        <CommentSubmit type="submit" onClick={require}>
          확인
        </CommentSubmit>
      </CommentForm>
    </Container>
  );
};

export default Comments;
