export default function Container({
  children,
  classNames = "",
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return (
    <section className={`w-full p-4 flex flex-col ${classNames}`}>
      {children}
    </section>
  );
}
