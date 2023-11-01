import { Category } from "@/util/types";
import { client } from "../../sanity/lib/client";
import MenuItem from "./MenuItem";

async function getCategories() {
  const query = `*[_type == "category"]{
    name,
  }`;

  return await client.fetch(query, { cache: "no-store" });
}

async function MenuContent() {
  const categories = (await getCategories()) as Category[];

  return (
    <>
      <li className="menu-title">Tags</li>{" "}
      {categories.length > 0 &&
        categories.map((c) => <MenuItem key={c.name} name={c.name} />)}
    </>
  );
}

export default MenuContent;
