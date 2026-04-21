"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  DollarSign,
  GraduationCap,
  MapPin,
  Navigation as NavigationIcon,
  Search,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { DialogTitle } from "@/components/ui/dialog"
import {
  buildIndex,
  groupResults,
  searchAll,
  sectionLinks,
  type SearchResult,
} from "@/lib/search"

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const OPEN_COMMAND_PALETTE_EVENT = "guajira:open-search"

export function openCommandPalette() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))
}

const KIND_LABEL: Record<SearchResult["kind"], string> = {
  opportunity: "Oportunidades",
  program: "Programas",
  business: "Directorio",
  section: "Ir a",
}

const KIND_ORDER: SearchResult["kind"][] = [
  "opportunity",
  "program",
  "business",
  "section",
]

function ResultIcon({ kind }: { kind: SearchResult["kind"] }) {
  switch (kind) {
    case "opportunity":
      return <DollarSign className="h-4 w-4 text-turquoise-600" />
    case "program":
      return <GraduationCap className="h-4 w-4 text-coral-600" />
    case "business":
      return <Building2 className="h-4 w-4 text-amber-600" />
    case "section":
      return <NavigationIcon className="h-4 w-4 text-muted-foreground" />
  }
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const index = React.useMemo(() => buildIndex(), [])

  const results = React.useMemo(() => searchAll(query, index), [query, index])
  const grouped = React.useMemo(() => groupResults(results), [results])

  React.useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  const runCommand = React.useCallback(
    (href: string) => {
      onOpenChange(false)
      if (href.startsWith("/#")) {
        const id = href.slice(2)
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          router.push(href)
          return
        }
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", `#${id}`)
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          return
        }
      }
      router.push(href)
    },
    [onOpenChange, router],
  )

  const hasQuery = query.trim().length > 0

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Buscar en Guajira Emprende</DialogTitle>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Busca oportunidades, programas, negocios…"
      />
      <CommandList>
        {hasQuery ? (
          <>
            <CommandEmpty>Sin resultados para “{query}”.</CommandEmpty>
            {KIND_ORDER.map((kind) => {
              const items = grouped[kind]
              if (items.length === 0) return null
              return (
                <CommandGroup key={kind} heading={KIND_LABEL[kind]}>
                  {items.map((item) => (
                    <CommandItem
                      key={`${kind}-${item.id}`}
                      value={`${item.title} ${item.subtitle} ${item.keywords.join(" ")}`}
                      onSelect={() => runCommand(item.href)}
                    >
                      <ResultIcon kind={item.kind} />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {item.subtitle}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            })}
          </>
        ) : (
          <>
            <CommandEmpty>Empieza a escribir para buscar.</CommandEmpty>
            <CommandGroup heading="Sugerencias">
              {["Fondo Emprender", "Escuela Wayuu", "Cabo de la Vela", "Microcrédito"].map(
                (suggestion) => (
                  <CommandItem
                    key={suggestion}
                    value={suggestion}
                    onSelect={() => setQuery(suggestion)}
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </CommandItem>
                ),
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Ir a">
              {sectionLinks.map((section) => (
                <CommandItem
                  key={section.id}
                  value={`${section.title} ${section.keywords.join(" ")}`}
                  onSelect={() => runCommand(section.href)}
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{section.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {section.subtitle}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
      <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
        <span>Navega con ↑ ↓ · abre con ↵</span>
        <CommandShortcut>Esc para cerrar</CommandShortcut>
      </div>
    </CommandDialog>
  )
}

export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isShortcut =
        (event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)
      if (isShortcut) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    const openHandler = () => setOpen(true)
    window.addEventListener("keydown", handler)
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, openHandler)
    return () => {
      window.removeEventListener("keydown", handler)
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, openHandler)
    }
  }, [])

  return { open, setOpen }
}

export function GlobalCommandPalette() {
  const { open, setOpen } = useCommandPalette()
  return <CommandPalette open={open} onOpenChange={setOpen} />
}
