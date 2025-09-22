type Props = {
  path: string;
  filterId?: string; // Del filter-definition.json
  label?: string;
};

import { fetchResourceJson } from "@/lib/aem";
import { resolveComponent } from "@/lib/componentMap";

export default async function Container({
  path,
  filterId = "container-filter",
  label = "Container",
}: Props) {
  // .2.json para incluir hijos inmediatos con sus props
  const data = await fetchResourceJson(path, 2);

  // Solo hijos que sean objetos "nodo" (no arrays) y tengan sling:resourceType
    const children = Object.entries<any>(data).filter(([key, val]) => {
        if (!val || typeof val !== "object" || Array.isArray(val)) return false;
        if (key.startsWith(":") || key.startsWith("jcr:")) return false;
        if (key === "cq:responsive" || key === "cq:styleIds") return false;
        return typeof val["sling:resourceType"] === "string";
    });

  console.log(
    "Container children:",
    children.map(([name, node]) => ({
        name,
        rt: node["sling:resourceType"],
    }))
    );

  const aueResource = `urn:aemconnection:${path}`;

    const isContainerRT = (rt?: string) =>
    rt === "wknd/components/container" ||
    rt === "core/wcm/components/container/v1/container" ||
    rt === "wcm/foundation/components/responsivegrid";

  return (
    <section
        data-aue-resource={aueResource}
        data-aue-type="container"
        data-aue-label={label}
        data-aue-behavior="container"
        data-aue-filter={filterId}
        style={{ display: "grid", gap: 16 }}
    >
        {children.map(([name, node]) => {
        const childPath = `${path}/${name}`;
        const resourceType = node["sling:resourceType"] as string;

        if (isContainerRT(resourceType)) {
            return (
            <Container
                key={childPath}
                path={childPath}
                filterId={filterId}
                label="Container"
            />
            );
        }

        const Comp = resolveComponent(resourceType);
        const html = typeof node?.text === "string" ? node.text : "";

        return (
            <Comp
            key={childPath}
            id={name}
            path={childPath}
            html={html}
            node={node}
            />
        );
        })}
    </section>
    );
}
