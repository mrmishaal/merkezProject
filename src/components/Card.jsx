function Card({ children, className = '' }) {
  return (
    <article className={`rounded-xl2 bg-white p-6 shadow-soft transition duration-300 ${className}`}>
      {children}
    </article>
  );
}

export default Card;
