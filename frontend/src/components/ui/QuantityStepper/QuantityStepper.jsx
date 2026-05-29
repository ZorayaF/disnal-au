export const QuantityStepper = ({
  value = 1,
  onDecrease,
  onIncrease,
  disabled = false,
  disableDecrease = false,
  disableIncrease = false,
}) => {
  return (
    <div
      className="inline-grid grid-cols-[2rem_2.6rem_2rem] overflow-hidden rounded-[999px] border border-neutral-950 bg-white text-neutral-950"
      aria-label="Selector de cantidad"
    >
      <button
        type="button"
        className="grid h-7 place-items-center border-r border-neutral-950 text-base leading-none transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-35"
        onClick={onDecrease}
        disabled={disabled || disableDecrease || value <= 1}
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span className="grid h-7 place-items-center text-xs font-black tracking-[0.12em]" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="grid h-7 place-items-center border-l border-neutral-950 text-base leading-none transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-35"
        onClick={onIncrease}
        disabled={disabled || disableIncrease}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
};
