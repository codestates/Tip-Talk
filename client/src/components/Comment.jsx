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
  border-bottom: 1px solid ${({ theme }) => theme.line};
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Name = styled.span`
  font-weight: ${({ weight }) => (weight ? weight : 400)};
  margin-right: 6px;
`;

const TextInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color};
  font-size: 15px;
  font-weight: ${({ weight }) => (weight ? weight : 400)};
  margin-right: 6px;
  padding: 7px;
  border: none;
  outline: none;
  background-color: transparent;
`;

const Text = styled.p`
  width: 100%;
  font-weight: ${({ weight }) => (weight ? weight : 400)};
  margin-right: 6px;
`;

const Button = styled.button`
  border: none;
  color: ${Color_2};
  background-color: transparent;
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
  }, [isEdit]);

  const onEditToggle = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };

  const EditSubmit = () => {
    handleEdit(inputRef.current.value, comment.id);
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
      <Left>
        <Name weight="bold">{comment.nickname}</Name>
        {isEdit ? <TextInput ref={inputRef} /> : <Text>{comment.text}</Text>}
        {isEdit ? (
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
        )}
      </Left>
      <div>
        <Text>{comment.updatedAt}</Text>
      </div>
    </CommentContainer>
  );
};

export default Comment;
