import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"

const sections = [
  { id: "all", label: "All" },
  { id: "essays", label: "Essays" },
  { id: "experiences", label: "Experiences" },
  { id: "projects", label: "Projects" },
  { id: "concepts", label: "Concepts" },
] as const

type SectionId = (typeof sections)[number]["id"]

// Each filter shows only its latest PAGE_SIZE notes. "All" is paginated: page N
// is the union of the Nth PAGE_SIZE-chunk of every filter, so page 1 holds the
// latest PAGE_SIZE of each.
const PAGE_SIZE = 10

function sectionOf(slug: string): Exclude<SectionId, "all"> | null {
  if (!slug.startsWith("Vibhuti/") || isFolderPath(slug)) return null
  if (slug.startsWith("Vibhuti/Essays/")) return "essays"
  if (slug.startsWith("Vibhuti/Experiences/")) return "experiences"
  if (slug.startsWith("Vibhuti/Projects/")) return "projects"
  if (!slug.slice("Vibhuti/".length).includes("/")) return "concepts"
  return null
}

const sectionLabel: Record<Exclude<SectionId, "all">, string> = {
  essays: "Essays",
  experiences: "Experiences",
  projects: "Projects",
  concepts: "Concepts",
}

const GardenFeed: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const pages = allFiles
    .map((page) => ({ page, section: sectionOf(page.slug ?? "") }))
    .filter(
      (entry): entry is { page: (typeof allFiles)[number]; section: Exclude<SectionId, "all"> } =>
        entry.section !== null,
    )
    .sort((a, b) => byDateAndAlphabetical(cfg)(a.page, b.page))

  // Page number of each note within its own section (1-based).
  const seen: Record<string, number> = {}
  const paged = pages.map((entry) => {
    const rank = (seen[entry.section] = (seen[entry.section] ?? 0) + 1) - 1
    return { ...entry, pageNum: Math.floor(rank / PAGE_SIZE) + 1 }
  })
  const totalPages = Math.max(1, ...paged.map((entry) => entry.pageNum))

  return (
    <div class="garden-feed">
      <h3>Latest</h3>
      <div class="garden-filters" role="group" aria-label="Filter notes">
        {sections.map((section) => (
          <button
            type="button"
            class={section.id === "all" ? "active" : undefined}
            data-filter={section.id}
          >
            {section.label}
          </button>
        ))}
      </div>
      <ul class="garden-list">
        {paged.map(({ page, section, pageNum }) => {
          const title = page.frontmatter?.title
          const tags = page.frontmatter?.tags ?? []
          const date = getDate(cfg, page)
          return (
            <li
              class="garden-item"
              data-section={section}
              data-page={pageNum}
              hidden={pageNum !== 1}
            >
              <h3>
                <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                  {title}
                </a>
              </h3>
              <p class="meta">
                {date && <Date date={date} locale={cfg.locale} />}
                <span class="garden-section">{sectionLabel[section]}</span>
              </p>
              {tags.length > 0 && (
                <ul class="tags">
                  {tags.map((tag) => (
                    <li>
                      <a
                        class="internal tag-link"
                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
      <nav class="garden-pagination" aria-label="Feed pages" hidden={totalPages <= 1}>
        <button type="button" class="garden-prev" aria-label="Previous page" disabled>
          ← Prev
        </button>
        <span class="garden-page-status">Page 1 of {totalPages}</span>
        <button type="button" class="garden-next" aria-label="Next page" disabled={totalPages <= 1}>
          Next →
        </button>
      </nav>
    </div>
  )
}

GardenFeed.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const root = document.querySelector(".garden-feed")
  if (!root) return
  const buttons = [...root.querySelectorAll(".garden-filters button")]
  const items = [...root.querySelectorAll(".garden-item")]
  const prev = root.querySelector(".garden-prev")
  const next = root.querySelector(".garden-next")
  const status = root.querySelector(".garden-page-status")
  const nav = root.querySelector(".garden-pagination")

  let section = "all"
  let page = 1

  const matches = (item) => section === "all" || item.dataset.section === section
  // Only "All" paginates; single filters show just their latest PAGE_SIZE (page 1).
  const totalPages = () =>
    section !== "all"
      ? 1
      : Math.max(1, ...items.map((item) => Number(item.dataset.page)))

  const render = () => {
    const total = totalPages()
    page = Math.min(Math.max(page, 1), total)
    for (const button of buttons) {
      button.classList.toggle("active", button.dataset.filter === section)
    }
    for (const item of items) {
      item.hidden = !matches(item) || Number(item.dataset.page) !== page
    }
    nav.hidden = total <= 1
    prev.disabled = page <= 1
    next.disabled = page >= total
    status.textContent = "Page " + page + " of " + total
  }

  const goTo = (target) => {
    page = target
    render()
    root.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const cleanups = []
  const on = (el, fn) => {
    el.addEventListener("click", fn)
    cleanups.push(() => el.removeEventListener("click", fn))
  }

  for (const button of buttons) {
    on(button, () => {
      const selected = button.dataset.filter
      const alreadyActive = button.classList.contains("active")
      section = alreadyActive && selected !== "all" ? "all" : selected
      page = 1
      render()
    })
  }
  on(prev, () => goTo(page - 1))
  on(next, () => goTo(page + 1))
  window.addCleanup(() => cleanups.forEach((fn) => fn()))

  render()
})
`

GardenFeed.css = `
.garden-feed > h3 {
  margin: 0.5rem 0 0 0;
  font-size: 1.5rem;
}

.garden-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.8rem 0 0.2rem;
}

.garden-filters button {
  border: 1px solid var(--lightgray);
  background: transparent;
  color: var(--darkgray);
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
}

.garden-filters button.active {
  background: var(--highlight);
  border-color: var(--secondary);
  color: var(--secondary);
}

.garden-list {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
}

.garden-item {
  margin: 1.1rem 0;
}

.garden-item h3 {
  margin: 0;
}

.garden-item h3 a {
  background-color: transparent;
}

.garden-item .meta {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  margin: 0.15rem 0 0;
  opacity: 0.75;
  font-size: 0.9rem;
}

.garden-section {
  color: var(--secondary);
  font-weight: 600;
}

.garden-item .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;
  padding: 0;
  margin: 0.35rem 0 0;
}

.garden-item[hidden],
.garden-pagination[hidden] {
  display: none;
}

.garden-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0 0.5rem;
}

.garden-pagination button {
  border: 1px solid var(--lightgray);
  background: transparent;
  color: var(--secondary);
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
}

.garden-pagination button:disabled {
  color: var(--gray);
  cursor: default;
}

.garden-page-status {
  color: var(--darkgray);
  font-size: 0.9rem;
}
`

export default (() => GardenFeed) satisfies QuartzComponentConstructor
