import { FC } from "react";
import type { CertificationType } from "../type/Certification.type";

const CertificationItem: FC<{certification: CertificationType}> = ({certification}) => {
// export default function CertificationItem(certification: CertificationType){ うまくいかないみたい
  return (
    <>
      <p>資格名: {certification.name}</p>
      <p>受験日: {certification.date}</p>
      <p>結果: {certification.result}</p>
    </>
  )
}

export default CertificationItem;
