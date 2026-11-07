import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"

const sections = [
  { id: "all", label: "All" },
  { id: "essays", label: "Essays" },
  { id: "experiences", label: "Experiences" },
  { id: "projects", label: "Projects" },
  { id: "vibhuti", label: "Vibhuti" },
] as const

type SectionId = (typeof sections)[number]["id"]

function sectionOf(slug: string): Exclude<SectionId, "all"> | null {
  if (!slug.startsWith("Vibhuti/") || isFolderPath(slug)) return null
  if (slug.startsWith("Vibhuti/Essays/")) return "essays"
  if (slug.startsWith("Vibhuti/Experiences/")) return "experiences"
  if (slug.startsWith("Vibhuti/Projects/")) return "projects"
  if (!slug.slice("Vibhuti/".length).includes("/")) return "vibhuti"
  return null
}

const sectionLabel: Record<Exclude<SectionId, "all">, string> = {
  essays: "Essays",
  experiences: "Experiences",
  projects: "Projects",
  vibhuti: "Vibhuti",
}

const GardenFeed: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const pages = allFiles
    .map((page) => ({ page, section: sectionOf(page.slug ?? "") }))
    .filter((entry): entry is { page: (typeof allFiles)[number]; section: Exclude<SectionId, "all"> } =>
      entry.section !== null,
    )
    .sort((a, b) => byDateAndAlphabetical(cfg)(a.page, b.page))

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
        {pages.map(({ page, section }) => {
          const title = page.frontmatter?.title
          const tags = page.frontmatter?.tags ?? []
          const date = getDate(cfg, page)
          return (
            <li class="garden-item" data-section={section}>
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
    </div>
  )
}

GardenFeed.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const root = document.querySelector(".garden-feed")
  if (!root) return
  const buttons = [...root.querySelectorAll(".garden-filters button")]
  const items = [...root.querySelectorAll(".garden-item")]

  const apply = (section) => {
    for (const button of buttons) {
      button.classList.toggle("active", button.dataset.filter === section)
    }
    for (const item of items) {
      item.hidden = section !== "all" && item.dataset.section !== section
    }
  }

  for (const button of buttons) {
    const onClick = () => {
      const selected = button.dataset.filter
      const alreadyActive = button.classList.contains("active")
      apply(alreadyActive && selected !== "all" ? "all" : selected)
    }
    button.addEventListener("click", onClick)
    window.addCleanup(() => button.removeEventListener("click", onClick))
  }
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

.garden-item[hidden] {
  display: none;
}
`

export default (() => GardenFeed) satisfies QuartzComponentConstructor
