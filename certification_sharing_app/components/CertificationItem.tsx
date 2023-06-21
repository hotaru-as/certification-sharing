import { FC } from "react";
import type { CertificationType } from "../type/Certification.type";
import { CertificationCategory } from "../type/CertificationCategory.type";

const CertificationItem: FC<{certification: CertificationType, categories: CertificationCategory[]}> = ({certification, categories}) => {
// export default function CertificationItem(certification: CertificationType){ うまくいかないみたい

  return (
    <>
      <p>資格名: {categories.find((category: CertificationCategory) => category.id == certification.certification).name}</p>
      <p>受験日: {certification.examDate}</p>
      <p>結果: {certification.result ? "合格" : "不合格"}</p>
    </>
  )
}

export default CertificationItem;
