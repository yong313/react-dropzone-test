import React from "react";

const mockFiles = [
  { name: "example1.txt", size: 1024 },
  { name: "example2.jpg", size: 2048 },
  { name: "example3.pdf", size: 3096 },
];

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>파일 이름</th>
          <th>파일 크기</th>
        </tr>
      </thead>
      <tbody>
        {mockFiles.map((file, index) => (
          <tr key={index}>
            <td>{file.name}</td>
            <td>{file.size} bytes</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
