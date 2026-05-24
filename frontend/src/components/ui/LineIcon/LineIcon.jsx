import './LineIcon.css';

const ICONS = {
  whatsapp: '☏',
  mail: '✉',
  phone: '☎',
  form: '▤',
  clock: '◷',
  document: '▤',
  lock: '▣',
  warranty: '◯',
  scale: '⚖',
  cookie: '◌',
  quality: '☆',
  support: '◔',
  catalog: '□',
  truck: '▱',
  user: '♙',
  calendar: '▣',
  check: '✓',
  pin: '⌖',
  trash: '⌫',
  edit: '✎',
  plus: '+',
  logout: '↪',
};

export const LineIcon = ({ name = 'document', className = '', 'aria-label': ariaLabel }) => (
  <span className={`disnal-line-icon ${className}`.trim()} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true}>
    {ICONS[name] || ICONS.document}
  </span>
);
