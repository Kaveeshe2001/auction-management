import type { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import './dropzone.css';

type DropzoneProps = {
    label?: string;
    id: string;
    name: string;
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
    isDragActive: boolean;
};

const Dropzone = ({
  label,
  id,
  name,
  getRootProps,
  getInputProps,
  isDragActive,
}: DropzoneProps) => {
  return (
    <div className='form-inner'>
      {label && <label htmlFor={id}>{label}</label>}
      <div {...getRootProps()} className='drop-zone'>
        <input {...getInputProps()} name={name} id={id} />
        {isDragActive ? (
            <p>Drop the files here ...</p>
        ) : (
            <p>Drag 'n' drop some image here, or click to image file</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
