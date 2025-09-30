type Props = {
  listPath: string; //content/dam/wknd/cfs/component-list-1
  prop?: string; // 'items'
  filterId?: string; // 'cf-components'
  label?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function ContainerCF({
  listPath,
  prop = "items",
  filterId = "cf-components",
  label = "CF Container",
  className,
  children
}: Props) {
  const resource = `urn:aemconnection:${listPath}/jcr:content/data/master`;

  return (
    <section
      data-aue-resource={resource}
      data-aue-type="container"
      data-aue-prop={prop}
      data-aue-filter={filterId}
      data-aue-label={label}
      className={className}
    >
      {children}
    </section>
  );
}