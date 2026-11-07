import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  /**
   * "sidebar": left sidebar on tablet + desktop (hidden on mobile via DesktopOnly).
   * "inline": in the page body, shown only on mobile, where there is no sidebar.
   */
  placement: "sidebar" | "inline"
}

const SubscribeCTA = (opts?: Partial<Options>) => {
  const placement = opts?.placement ?? "sidebar"
  const Component = ({ displayClass }: QuartzComponentProps) => (
    <div class={classNames(displayClass, "subscribe-cta", `subscribe-cta--${placement}`)}>
      <p>
        <a
          href="https://pranavmandhare.us12.list-manage.com/subscribe?u=e38e9b467797bfcf55178c605&id=524512c21b"
          target="_blank"
          rel="noopener noreferrer"
          class="subscribe-link"
        >
          Subscribe
        </a>{" "}
        to get once-a-week summary of essays, topics, experiences, and projects
      </p>
    </div>
  )

  Component.css = style
  return Component
}

const style = `
.subscribe-cta {
  margin-top: 1em;
  margin-bottom: 1.5em;
  padding: 0.8em 1em;
  background-color: var(--highlight);
  border-radius: 6px;
  border-left: 3px solid var(--secondary);
}

.subscribe-cta p {
  margin: 0;
  font-size: 0.9em;
  color: var(--gray);
  line-height: 1.4;
}

:root[saved-theme="light"] .subscribe-cta p {
  /* --gray is too faint on the light background */
  color: var(--darkgray);
}

.subscribe-link {
  color: var(--secondary);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.subscribe-link:hover {
  color: var(--tertiary);
  border-bottom-color: var(--tertiary);
}

/* Inline variant replaces the sidebar one on mobile only */
.subscribe-cta--inline {
  margin: 2rem 0 1rem;
}

body[data-slug="index"] .subscribe-cta--inline {
  margin: 0 0 1.5rem;
}

@media all and (min-width: 801px) {
  .subscribe-cta--inline {
    display: none;
  }
}
`

export default SubscribeCTA satisfies QuartzComponentConstructor<Partial<Options>>
