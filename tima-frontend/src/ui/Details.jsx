function Details({ children }) {
  return (
    <section className="no-scrollbar absolute left-[24vw] top-[70px] z-50 grid h-[75vh] w-[35vw] min-w-[300px] grid-cols-2 grid-rows-[8rem_min-content_min-content] gap-6 overflow-y-scroll rounded-md border border-secondary-300 bg-primary-100 p-6 shadow-lg">
      {children}
    </section>
  );
}

export default Details;
