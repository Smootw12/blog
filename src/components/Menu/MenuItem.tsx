import Link from "next/link";

interface Props {
  active?: boolean;
  name: string;
}

function MenuItem({ active, name }: Props) {
  return (
    <>
      <li>
        <Link href={`/categories/${name}`}>{name}</Link>
      </li>
    </>
  );
}

export default MenuItem;
