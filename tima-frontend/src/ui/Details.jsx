function Details({ children }) {
  return (
    <section className="absolute left-[24vw] top-[70px] z-50 h-[75vh] w-[35vw] min-w-[300px] rounded-md border border-secondary-300 bg-primary-100 shadow-lg">
      {children}
    </section>
  );
}

export default Details;
