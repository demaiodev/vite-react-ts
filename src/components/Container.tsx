export default function Container({
  children,
  classNames = "",
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return (
    <section className={`flex flex-col items-center ${classNames}`}>
      {children}
    </section>
  );
}
