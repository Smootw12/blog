import { Category } from "@/util/types";
import { client } from "../../sanity/lib/client";
import MenuItem from "./MenuItem";

async function getCategories() {
  const query = `*[_type == "category"]{
    name,
  }`;

  return await client.fetch(query);
}

interface Props {
  active?: string;
}

async function Menu({ active }: Props) {
  const categories = (await getCategories()) as Category[];
  return (
    <>
      <ul className="mb-3 bg-base-100 rounded-2xl menu menu-horizontal max-w-2xl sticky z-10 top-[6px]">
        <li className="menu-title">Tags</li>
        {categories.map((category) => (
          <MenuItem
            key={category.name}
            active={active === category.name}
            name={category.name}
          />
        ))}
      </ul>
    </>
  );
}

export default Menu;
