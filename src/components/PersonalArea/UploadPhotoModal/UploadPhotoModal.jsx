import './UploadPhotoModal.scss';
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { takeAnglesList } from '../../../redux/selectors/product-selectors';
import { uploadPhotoForProductThunk } from '../../../redux/thunks/authRequest-thunk';

Modal.setAppElement('#root');

export const UploadPhotoModal = ({ closeModal, elem, isOpen }) => {
  const dispatch = useDispatch();
  const product = elem;
  const [photoFiles, setPhotoFiles] = useState([]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const anglesList = useSelector(takeAnglesList);

  function getReasons(reasons) {
    if (reasons !== null && anglesList !== null) {
      const angles = reasons.split(',').map((el) => anglesList.find((elem) => elem.clickupId === el));
      setPhotoFiles(
        angles &&
          angles.map(
            (el, index) =>
              photoFiles.length === 0 && {
                key: index,
                file: '',
                imagePreviewUrl: '',
                angleId: el.id,
                error: false,
                angleName: el.publicName,
                format: null,
              },
          ),
      );
    }
  }

  useEffect(() => {
    product && getReasons(product.reasons);
  }, []);

  function handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    const index = e.target.id.split('-')[1];

    if (!file.name.match(/\.(gif|jpg|jpeg|png|heic|heif|JPG|JPEG|PNG|HEIC|HEIF)$/)) {
      setPhotoFiles(photoFiles.map((item) => (item.key === index ? { ...item, format: false } : item)));
      return;
    }
    reader.onloadend = () => {
      setPhotoFiles(
        photoFiles.map((item) =>
          item.key === index
            ? {
                ...item,
                file,
                imagePreviewUrl: reader.result,
                error: false,
                format: true,
              }
            : item,
        ),
      );
    };
    reader.readAsDataURL(file);
  }

  async function handlePost() {
    await photoFiles.map(
      (el, index) =>
        el.file !== '' &&
        dispatch(
          uploadPhotoForProductThunk(
            {
              isAdditional: true,
              productId: product.id,
              file: el.file,
              angleId: el.angleId,
            },
            photoFiles.length,
            index,
          ),
        ),
    );

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <>
      {product && (
        <Modal
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          overlayClassName="overlayStyle"
          className="contentStyle"
        >
          <div className="modal__photo-container">
            <div className="modal__photo-wrapper">
              {photoFiles.length > 0 &&
                photoFiles.map((el, index) => (
                  <div key={index} className={`modal__photo-elem ${index}`}>
                    {el.imagePreviewUrl !== '' ? (
                      <label
                        htmlFor={`photo-${index}`}
                        className="modal__photo-previewImg"
                        style={{ background: `url(${el.imagePreviewUrl})` }}
                      >
                        <input
                          className={`modal__photo-fileInput ${index}`}
                          accept=".heic,.png,.heif,.jpg,.jpeg"
                          type="file"
                          onChange={handleImageChange}
                          id={`photo-${index}`}
                        />
                      </label>
                    ) : (
                      <label htmlFor={`photo-${index}`} className="auth_request__form__photo-photolabel required">
                        <input
                          className={`modal__photo-fileInput ${index}`}
                          accept=".heic,.png,.heif,.jpg,.jpeg"
                          type="file"
                          onChange={handleImageChange}
                          id={`photo-${index}`}
                        />
                      </label>
                    )}
                    <div className="modal__photo-name">{el.angleName}</div>
                    {el.format !== null && el.format !== true && (
                      <div className="modal__photo-error">Format is not available</div>
                    )}
                  </div>
                ))}
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                  jsx-a11y/no-static-element-interactions */}
            <div className="modal__photo-submit" onClick={handlePost}>
              Upload
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
