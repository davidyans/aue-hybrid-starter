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
      className="flex flex-wrap items-center bg-gray-100 rounded-lg shadow-md p-6 max-w-7xl w-full"
      data-aue-resource={aue}
      data-aue-type="reference"
      data-aue-filter="postcardscontainercf"
      data-aue-label="Post Cards Container"
      data-aue-model="postcardscontainercf"
    >
      <header className="w-full mb-4">
        <h2
          data-aue-prop="title"
          data-aue-type="text"
          className="text-2xl font-bold text-gray-800"
        >
          {item.title}
        </h2>
        {item.subtitle && (
          <p
            data-aue-prop="subtitle"
            data-aue-type="text"
            className="text-lg text-gray-600"
          >
            {item.subtitle}
          </p>
        )}
      </header>
      <div
        data-aue-type="container"
        data-aue-filter="postcardscontainercf"
        data-aue-prop="items"
        data-aue-label="Cards list"
        className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {item.items?.map((card: any) => (
          <PostCard key={card._path} item={card} />
        ))}
      </div>
    </section>
  );
}
