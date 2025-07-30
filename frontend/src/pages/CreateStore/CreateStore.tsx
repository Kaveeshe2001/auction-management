import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom"
import { storePostApi } from "../../services/StoreServices";
import { toast } from "react-toastify";
import { useDropzone, type DropEvent, type FileRejection } from "react-dropzone";
import Breadcrumb from "../../components/Shared/Breadcrumb/Breadcrumb";
import { Col, Container, Row } from "react-bootstrap";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import Dropzone from "../../components/ui/Dropzone/Dropzone";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton/PrimaryButton";

const CreateStore = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pno, setPno] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    pno?: string;
    address?: string;
  }>({});
  const [coverImagePreview, setCoverImagePreview] = useState<
    string | undefined | null
  >(null);
  const [profileImagePreview, setProfileImagePreview] = useState<
    string | undefined | null
  >(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newErrors: {
        email?: string;
        name?: string;
        pno?: string;
        address?: string;
    } = {};

    if (
        typeof acceptedCoverFiles[0] === 'undefined' ||
        typeof acceptedProfileFiles[0] === 'undefined'
    )
    return;

    if (!email) newErrors.email = 'Email is required';
    if (!name) newErrors.name = 'Name is required';
    if (!pno) newErrors.pno = 'Phone number is required';
    if (!address) newErrors.address = 'Address is required';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        const formDataCover = new FormData();
        const formDataProfile = new FormData();

        formDataCover.append('file', acceptedCoverFiles[0]);
        formDataCover.append('upload_preset', 'aesthetic-auction');
        formDataCover.append('api_key', import.meta.env.VITE_CLOUDNARY_API_KEY);

        formDataProfile.append('file', acceptedProfileFiles[0]);
        formDataProfile.append('upload_preset', 'aesthetic-auction');
        formDataProfile.append('api_key', import.meta.env.VITE_CLOUDNARY_API_KEY);

        const resultCover = await fetch('', {
            method: 'POST',
            body: formDataCover,
        }).then((r) => r.json());

        const resultProfile = await fetch('', {
            method: 'POST',
            body: formDataProfile,
        }).then((r) => r.json());

        storePostApi(
            name,
            email,
            pno,
            address,
            resultCover.secure_url,
            resultProfile.secure_url
        )
        .then((res) => {
            if (res) {
                toast.success('Store created successfully');
                localStorage.setItem('hasStore', '1');
                navigate('/');
            }
        })
        .catch((e) => {
            toast.warning(e);
        });

    }
  };

  const onDropCoverImage = useCallback(
    (
        acceptedFiles: File[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => {
        const file = new FileReader();

        file.onload = () => {
            setCoverImagePreview(file.result as string | undefined);
        };
        file.readAsDataURL(acceptedFiles[0]);

        console.log(fileRejections, event);
    }, []
  );

  const onDropProfileImage = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const file = new FileReader();

      file.onload = () => {
        setProfileImagePreview(file.result as string | undefined);
      };
      file.readAsDataURL(acceptedFiles[0]);

      console.log(fileRejections, event);
    }, []
  );

  const {
    acceptedFiles: acceptedCoverFiles,
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({ onDrop: onDropCoverImage });

  const {
    acceptedFiles: acceptedProfileFiles,
    getRootProps: getProfileRootProps,
    getInputProps: getProfileInputProps,
    isDragActive: isProfileDragActive,
  } = useDropzone({ onDrop: onDropProfileImage });

  return (
    <div>
      <Breadcrumb>
        <h1>Create your store</h1>

        <ul className="breadcrumb-list">
            <li>
                <a href="/">Home</a>
            </li>
            <li>Create Store</li>
        </ul>
      </Breadcrumb>

      <Container>
        <Row style={{ justifyContent: 'center' }}>
            <Col lg={10}>
                <Form onSubmit={handleSubmit}>
                    <Col md={12}>
                        <Input
                          label='Store Email'
                          type='email'
                          placeHolder='john@gmail.com'
                          id='email'
                          name='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={errors.email}
                        />
                    </Col>
                    <Col md={6}>
                        <Input
                          label='Store Name'
                          type='text'
                          placeHolder='John Owen'
                          id='name'
                          name='name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          error={errors.name}
                        />
                    </Col>
                    <Col md={6}>
                      <Input
                        label='Store Phone Number'
                        type='text'
                        placeHolder='056 456 147 56'
                        id='pno'
                        name='pno'
                        value={pno}
                        onChange={(e) => setPno(e.target.value)}
                        error={errors.pno}
                      />
                    </Col>
                    <Col md={12}>
                      <Input
                        label='Store Address'
                        type='text'
                        placeHolder='219/B, Breaker Street, London, UK'
                        id='address'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={errors.address}
                      />
                    </Col>
                    <Col md={12}>
                      <Dropzone
                        label='Cover Image'
                        id='coverImage'
                        name='coverImage'
                        getRootProps={getCoverRootProps}
                        getInputProps={getCoverInputProps}
                        isDragActive={isCoverDragActive}
                      />
                      {coverImagePreview && (
                        <div className='upload-image'>
                          <img src={coverImagePreview} alt='Cover Image' />
                        </div>
                      )}
                    </Col>
                    <Col md={12}>
                      <Dropzone
                        label='Profile Image'
                        id='profileImage'
                        name='profileImage'
                        getRootProps={getProfileRootProps}
                        getInputProps={getProfileInputProps}
                        isDragActive={isProfileDragActive}
                      />
                      {profileImagePreview && (
                        <div className='upload-image-profile'>
                          <img src={profileImagePreview} alt='Profile Image' />
                        </div>
                      )}
                    </Col>

                    <div className="auth-btn">
                        <PrimaryButton
                           variant='white'
                           text='Create Store'
                           type='submit'
                        />
                    </div>
                </Form>
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateStore;
