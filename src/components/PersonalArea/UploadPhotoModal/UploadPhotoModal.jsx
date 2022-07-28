import './UploadPhotoModal.scss'
import Modal from 'react-modal'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { takeAnglesList } from '../../../redux/selectors/product-selectors';
import { uploadPhotoForProductThunk } from '../../../redux/thunks/authRequest-thunk';

Modal.setAppElement('#root');

const UploadPhotoModal = (props) => {

    const dispatch = useDispatch()

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const product = props.elem

    const [photoFiles, setPhotoFiles] = useState([])

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    const anglesList = useSelector(takeAnglesList)

    function getReasons(reasons) {
        if (reasons !== null && anglesList !== null) {
            const angles = reasons.split(',').map(el => anglesList.find(elem => elem.clickupId === el))
            setPhotoFiles(angles && angles.map((el, index) => photoFiles.length == 0 && { key: index, file: '', imagePreviewUrl: '', angleId: el.id, error: false, angleName: el.publicName, format: null }))
        }
    }

    useEffect(() => {
        product && getReasons(product.reasons)
    }, [])

    function handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        let index = e.target.id.split('-')[1]

        if (!file.name.match(/\.(gif|jpg|jpeg|png|heic|heif|JPG|JPEG|PNG|HEIC|HEIF)$/)) {
            setPhotoFiles(
                photoFiles.map(item =>
                    item.key == index ? { ...item, format: false } : item)
            )
            return
        }
        reader.onloadend = () => {
            setPhotoFiles(
                photoFiles.map(item =>
                    item.key == index ? { ...item, file: file, imagePreviewUrl: reader.result, error: false, format: true } : item)
            )
        }
        reader.readAsDataURL(file)
    }

    async function handlePost() {
        console.log(photoFiles)
        const response = await photoFiles.map(
            (el, index) => el.file !== '' && dispatch(uploadPhotoForProductThunk({ productId: product.id, file: el.file, angleId: el.angleId }, photoFiles.length, index))
        )
    }



    return (
        <>
            {product &&
                <Modal
                    isOpen={props.isOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={props.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">

                    <div className='modal__photo-container'>
                        <div className='modal__photo-wrapper'>
                            {photoFiles.length > 0 && photoFiles.map((el, index) =>
                                <div key={index} className={`modal__photo-elem ${index}`}>
                                    {el.imagePreviewUrl !== '' ?
                                        <label htmlFor={`photo-${index}`} className='modal__photo-previewImg' style={{ background: `url(${el.imagePreviewUrl})` }}>
                                            <input className={`modal__photo-fileInput ${index}`} accept=".heic,.png,.heif,.jpg,.jpeg" type="file" onChange={handleImageChange} id={`photo-${index}`} />
                                        </label>
                                        : <label htmlFor={`photo-${index}`} className='auth_request__form__photo-photolabel required'>
                                            <input className={`modal__photo-fileInput ${index}`} accept=".heic,.png,.heif,.jpg,.jpeg" type="file" onChange={handleImageChange} id={`photo-${index}`} />
                                        </label>}
                                    <div className='modal__photo-name'>{el.angleName}</div>
                                    {el.format !== null && el.format !== true && <div className='modal__photo-error'>Format is not available</div>}
                                </div>)}
                        </div>
                        <div className='modal__photo-submit' onClick={handlePost}>Upload</div>
                    </div>

                </Modal>
            }
        </>
    )
}

export default UploadPhotoModal