export default function Error() {
  return (
    <div className="w-full h-svh flex justify-center items-center flex-col">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-heart-broken"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        <path d="M12 6l-2 4l4 3l-2 4v3" />
      </svg>
      <h2 className="font-bold text-3xl text-center">
        No eres tú, somos nosotros...
      </h2>
      <p className="mt-2  text-center text-balance">
        Algo salió mal, mira unos gatitos tiernos mientras lo arreglamos
      </p>
      <button className="btn btn-primary mt-4">
        {" "}
        <a href="https://www.youtube.com/watch?v=y0sF5xhGreA">
          Ver gatitos
        </a>{" "}
      </button>
    </div>
  );
}
