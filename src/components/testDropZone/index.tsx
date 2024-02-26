import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const TestDropZone = () => {
  const [mockData, setMockData] = useState([
    {
      check: () => window.alert("check-box1"),
      name: "example1.txt",
      size: 1024,
      action: () => window.alert("row-1"),
    },
    {
      check: () => window.alert("check-box2"),
      name: "example2.jpg",
      size: 2048,
      action: () => window.alert("row-2"),
    },
  ]);

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    const updatedFiles = acceptedFiles.map((file: any) => ({
      name: file.name,
      size: file.size,
    }));
    setMockData((prevFiles) => [...prevFiles, ...updatedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    autoFocus: false,
  });

  const deleteFile = (index: any) => {
    setMockData((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const BasicDropzone = () => {
    const { getInputProps, open } = useDropzone({
      onDrop: onDrop,
      noClick: true,
      noKeyboard: true,
    });

    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input {...getInputProps()} />
        <button type="button" onClick={open}>
          파일 업로드
        </button>
      </div>
    );
  };

  const Table = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="th"></th>
            <th className="th">파일 이름</th>
            <th className="th">파일 크기</th>
            <th className="th"></th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((file, index) => (
            <tr key={index}>
              <td
                className="td"
                onClick={file.check}
                style={{ cursor: "pointer" }}
              >
                check box
              </td>
              <td className="td">{file.name}</td>
              <td className="td">{file.size} bytes</td>
              <td
                className="td"
                onClick={file.action}
                style={{ cursor: "pointer" }}
              >
                action
              </td>
              <td className="td" onClick={() => deleteFile(index)}>
                delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Wrapper>
      <div className="option-box">
        <button className="test-button">폴더 만들기</button>
        <BasicDropzone />
        <div className="storage-box">저장 용량</div>
      </div>
      <div {...getRootProps()} className="content-box">
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="info-msg">
            <h1>📂</h1>
            <p>Drag & Drop하여 파일 업로드 하기</p>
          </div>
        ) : null}
        <Table />
      </div>
    </Wrapper>
  );
};

export default TestDropZone;

const Wrapper = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .option-box {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .storage-box {
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0.3);
    height: 2.5rem;
    border-radius: 5px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .content-box {
    background-color: #000;
    position: relative;
    top: 0;
    left: 0;
  }

  .table {
    width: 100%;
    border: 1px solid #fff;
    border-collapse: collapse;
  }

  .th {
    border: 1px solid #fff;
    width: 22rem;
    padding: 2rem;
  }

  .td {
    border: 1px solid #fff;
    text-align: center;
    padding: 2rem;
  }

  .info-msg {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    color: #461ddc;
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    line-height: 0;

    h1 {
      font-size: 5rem;
      line-height: 0;
    }
  }
`;
