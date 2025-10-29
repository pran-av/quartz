import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const SubscribeIcon: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <a 
      href="https://pranavmandhare.us12.list-manage.com/subscribe?u=e38e9b467797bfcf55178c605&id=524512c21b" 
      target="_blank" 
      rel="noopener noreferrer"
      class={displayClass}
      aria-label="Subscribe to newsletter"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="subscribe-icon"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    </a>
  )
}

SubscribeIcon.css = `
.subscribe-icon {
  cursor: pointer;
  padding: 0;
  position: relative;
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  margin: 0;
  margin-left: 12px;
  text-align: inherit;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  & svg {
    position: absolute;
    width: 24px;
    height: 24px;
    top: calc(50% - 12px);
    fill: var(--darkgray);
    stroke: var(--darkgray);
    transition: opacity 0.1s ease;
  }

  &:hover svg {
    fill: var(--secondary);
    stroke: var(--secondary);
  }
}

/* Dark mode styling */
:root[saved-theme="dark"] .subscribe-icon svg {
  fill: white;
  stroke: white;
}

:root[saved-theme="dark"] .subscribe-icon:hover svg {
  fill: var(--secondary);
  stroke: var(--secondary);
}

/* Hide on desktop, show on mobile and tablet */
@media all and (min-width: 1200px) {
  .subscribe-icon {
    display: none;
  }
}
`

export default (() => SubscribeIcon) satisfies QuartzComponentConstructor
