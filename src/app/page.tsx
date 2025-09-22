import Container from "@/components/Container";

const ROOT_CONTAINER_JCR_PATH =
  "/content/wknd/us/en/test_headless/jcr:content/root/container";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <Container path={ROOT_CONTAINER_JCR_PATH} />
    </main>
  );
}
