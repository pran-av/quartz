import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function SubscribeCTA({}: QuartzComponentProps) {
  return (
    <div class="subscribe-cta">
      <p>
        <a 
          href="https://pranavmandhare.us12.list-manage.com/subscribe?u=e38e9b467797bfcf55178c605&id=524512c21b" 
          target="_blank" 
          rel="noopener noreferrer"
          class="subscribe-link"
        >
          Subscribe
        </a> to get once-a-week summary of essays, topics, experiences, and projects
      </p>
    </div>
  )
}

SubscribeCTA.css = `
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

/* Ensure hidden on mobile and tablet - override any conflicting styles */
@media all and (max-width: 1199px) {
  .subscribe-cta {
    display: none !important;
  }
}
`

export default (() => SubscribeCTA) satisfies QuartzComponentConstructor
