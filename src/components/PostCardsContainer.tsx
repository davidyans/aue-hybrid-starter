import PostCard from "./PostCard";

type Container = {
  _path: string;
  title?: string;
  subtitle?: string;
  items?: any[];
};

export default function PostCardsContainer({ item }: { item: Container }) {
  const aue = `urn:aemconnection:${item._path}/jcr:content/data/master`;

  return (
    <section
      data-aue-resource={aue}
      data-aue-type="reference"
      data-aue-filter="postcardscontainercf"
      data-aue-label="Post Cards Container"
      data-aue-model="postcardscontainercf"
    >
      <header style={{ marginBottom: 16 }}>
        <h2 data-aue-prop="title" data-aue-type="text">{item.title}</h2>
        {item.subtitle && (
          <p data-aue-prop="subtitle" data-aue-type="text">{item.subtitle}</p>
        )}
      </header>
      <div
        
        data-aue-type="container"
        data-aue-filter="postcardscontainercf"
        data-aue-prop="items"
        data-aue-label="Cards list"
        style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
      >
        {item.items?.map((card: any) => (
          <PostCard key={card._path} item={card} />
        ))}
      </div>
    </section>
  );
}
