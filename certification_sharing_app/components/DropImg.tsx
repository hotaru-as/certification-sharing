import { FC } from 'react';
import { useDropzone } from 'react-dropzone';

const CertificationItem: FC = () => {
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept: {
  //     'image/png': ['.png', '.jpg', '.jpeg'],
  //   },
  // });
    

  const onDrop = (files: File[]) => {
    if (files.length > 0) {
    }
  };
    
  return (
    <>
      {/* <div {...getRootProps()}>
        <input {...getInputProps} />
        <p>
          ファイルを選択または
          <br />
          ドラッグアンドドロップ
        </p>
      </div> */}
    </>
  )
}
    
export default CertificationItem;