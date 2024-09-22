  import React from "react";
  import Button from "../button/Button";
  import styled from "styled-components";
  import { ScaleLoader } from "react-spinners";

  const ConfirmationModal = ({ isOpen, onClose, onDelete, deleteReload }) => {
    if (!isOpen) return null;
    return (
      <div>
        <ModalOverlay>
          <ModalContent>
            <h4>Are you sure you want to Delete?</h4>
            <div className="d-flex justify-content-center gap-4">
              <Button name="Cancel" variant="secondary" onClick={onClose} />
              <Button
                name={
                  deleteReload ? (
                    <ButtonLoading>
                      Deleting
                      <ScaleLoader color="white" height={10} />
                    </ButtonLoading>
                  ) : (
                    "Delete"
                  )
                }
                variant="danger"
                onClick={onDelete}
              />
            </div>
          </ModalContent>
        </ModalOverlay>
      </div>
    );
  };

  export default ConfirmationModal;

  const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 9px;
  `;

  const ButtonLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  `;
