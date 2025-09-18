import Image from "next/image";
import HeaderXF from '@/components/header-xf/HeaderXF';
import FooterXF from '@/components/footer-xf/FooterXF';

import { fetchAemHtml } from "@/lib/aem";

export default async function Page() {
  const [headerHtml, footerHtml] = await Promise.all([
    fetchAemHtml("/content/experience-fragments/wknd/language-masters/en/site/header/header-1.html"),
    fetchAemHtml("/content/experience-fragments/wknd/language-masters/en/site/footer/footer-1.html"),
  ]);

  return (
    <>
      <HeaderXF html={headerHtml} label="Site header" />

      <main
        id="main-content"
        data-aue-type="container"
        data-aue-label="Container"
        data-aue-filter="container-filter"
        data-aue-resource={`urn:aemconnection:${process.env.NEXT_PUBLIC_AEM_PATH_PREFIX}/${/* slug/ruta de página */ ""}/jcr:content/root/container/container`}
      >
        {/* aquí renderizas tus componentes editables con UE */}
      </main>

      <FooterXF html={footerHtml} label="Site footer" />
    </>
  );
}

