import { useCallback, useState } from "react";
import { categoryPostApi } from "../../../services/CategoryServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDropzone, type DropEvent, type FileRejection } from "react-dropzone";
import { Col, Row } from "react-bootstrap";
import Form from "../../../components/ui/Form/Form";
import Input from "../../../components/ui/Input/Input";
import Dropzone from "../../../components/ui/Dropzone/Dropzone";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";

const AddCategory = () => {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [errors, setErrors] = useState<{
    categoryName?: string;
  }>({});
  const [imagePreview, setImagePreview] = useState<
     string | undefined | null
  >(null);
  const [iconPreview, setIconPreview] = useState<
     string | undefined | null
  >(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newErrors: {
        categoryName?: string;
    } = {};

    if (
        typeof acceptedImageFiles[0] === 'undefined' ||
        typeof acceptedIconFiles[0] === 'undefined'
    ) return;

    if (!categoryName) newErrors.categoryName = 'CategoryName is required';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        const formDataImage = new FormData();
        const formDataIcon = new FormData();

        formDataImage.append('file', acceptedImageFiles[0]);
        formDataImage.append('upload_preset', 'auction_mng');
        formDataImage.append('api_key', import.meta.env.VITE_CLOUDNARY_API_KEY);

        formDataIcon.append('file', acceptedIconFiles[0]);
        formDataIcon.append('upload_preset', 'auction_mng');
        formDataIcon.append('api_key', import.meta.env.VITE_CLOUDNARY_API_KEY); 

        const cloudinaryUrl = import.meta.env.VITE_CLOUDNARY_URL;

        const resultImage = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formDataImage,
        }).then((r) => r.json());

        const resultIcon = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formDataIcon,
        }).then((r) => r.json());

        categoryPostApi(
            categoryName,
            resultImage.secure_url,
            resultIcon.secure_url,
        )
        .then((res) => {
            if (res) {
                toast.success('Category created successfully');
                navigate('/');
            }
        })
        .catch((e) => {
            toast.warning(e);
        })
    }
  };

  const onDropImage = useCallback(
    (
        acceptedFiles: File[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => {
        const file = new FileReader();

        file.onload = () => {
            setImagePreview(file.result as string | undefined);
        };
        file.readAsDataURL(acceptedFiles[0]);

        console.log(fileRejections, event);
    }, []
  );

  const onDropIcon = useCallback(
    (
        acceptedFiles: File[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => {
        const file = new FileReader();

        file.onload = () => {
            setIconPreview(file.result as string | undefined);
        };
        file.readAsDataURL(acceptedFiles[0]);

        console.log(fileRejections, event);
    }, []
  );

  const {
    acceptedFiles: acceptedImageFiles,
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({ onDrop: onDropImage });

  const {
    acceptedFiles: acceptedIconFiles,
    getRootProps: getIconRootProps,
    getInputProps: getIconInputProps,
    isDragActive: isIconDragActive,
  } = useDropzone({ onDrop: onDropIcon });

  return (
    <Row style={{ width: '100%' }}>
        <Form onSubmit={handleSubmit}>
            <Col md={12}>
                <Input
                    type='text'
                    label='Category Name'
                    placeHolder='Category Name'
                    id='categoryName'
                    name='categoryName'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    error={errors.categoryName}
                />
            </Col>
            <Col md={12}>
                <Dropzone
                    label='Category Image'
                    id='image'
                    name='image'
                    getRootProps={getImageRootProps}
                    getInputProps={getImageInputProps}
                    isDragActive={isImageDragActive}
                />
                {imagePreview && (
                    <div className="upload-image-profile">
                        <img src={imagePreview} alt='Categry Image' />
                    </div>
                )}
            </Col>
            <Col md={12}>
                <Dropzone
                    label='Icon'
                    id='icon'
                    name='icon'
                    getRootProps={getIconRootProps}
                    getInputProps={getIconInputProps}
                    isDragActive={isIconDragActive}
                />
                {iconPreview && (
                    <div className="upload-image-profile">
                        <img src={iconPreview} alt="Icon" />
                    </div>
                )}
            </Col>

            <div className="auth-btn">
                <PrimaryButton
                    variant='white'
                    text='Create Category'
                    type='submit'
                />
            </div>
        </Form>
    </Row>
  );
};

export default AddCategory;
