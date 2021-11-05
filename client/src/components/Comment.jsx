import {
  faCheck,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Color_2 } from '../styles/common';
import Modal from './Modal';

const CommentContainer = styled.li`
  display: flex;
  font-size: 15px;
  margin: 3px 0;
  padding: 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  align-items: center;
`;

const Name = styled.span`
  min-width: 60px;
  font-weight: 600;
  margin-right: 10px;
`;

const TextInput = styled.input`
  display: block;
  width: 80%;
  height: 100%;
  color: ${({ theme }) => theme.color};
  font-size: 15px;
  font-weight: ${({ weight }) => (weight ? weight : 400)};
  margin-right: 6px;
  border: none;
  outline: none;
  background-color: transparent;
`;

const Text = styled.p`
  text-overflow: ellipsis;
  display: -webkit-box;
  width: 80%;
  margin-right: 6px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Button = styled.button`
  border: none;
  color: ${Color_2};
  background-color: transparent;
`;

const Date = styled.span`
  min-width: 60px;
  font-weight: 600;
`;

const Comment = ({ comment, handleEdit, handleDelete }) => {
  const inputRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isEdit) {
      inputRef.current.value = comment.text;
      inputRef.current.focus();
    }
  }, [isEdit, comment]);

  const onEditToggle = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };

  const EditSubmit = () => {
    handleEdit(inputRef.current.value, comment.id);
    inputRef.current.value = '';
    setIsEdit(false);
  };

  const onDelete = () => {
    handleDelete(comment.id);
  };

  const modalHandler = () => {
    setIsOpen(true);
  };

  return (
    <CommentContainer>
      {isOpen && (
        <Modal
          message="정말 댓글을 삭제하시겠습니까?"
          setIsOpen={setIsOpen}
          callback={onDelete}
        />
      )}
      <Name>{comment.user?.nickname}</Name>
      {isEdit ? <TextInput ref={inputRef} /> : <Text>{comment.text}</Text>}
      {comment.isMine ? (
        isEdit ? (
          <Button>
            <FontAwesomeIcon onClick={EditSubmit} icon={faCheck} />
          </Button>
        ) : (
          <>
            <Button>
              <FontAwesomeIcon onClick={onEditToggle} icon={faPencilAlt} />
            </Button>
            <Button>
              <FontAwesomeIcon onClick={modalHandler} icon={faTrash} />
            </Button>
          </>
        )
      ) : null}
      <Date>{comment.updatedAt}</Date>
    </CommentContainer>
  );
};

export default Comment;
