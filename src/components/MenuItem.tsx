import Link from "next/link";

interface Props {
  active?: boolean;
  name: string;
}

function MenuItem({ active, name }: Props) {
  return (
    <>
      <li>
        <Link
          className={active ? "active" : "false"}
          href={!active ? `/categories/${name}` : "/"}
        >
          {name}
        </Link>
      </li>
    </>
  );
}

export default MenuItem;
