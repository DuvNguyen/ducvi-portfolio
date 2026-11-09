'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface MarkdownRendererProps {
  content: string
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-md">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/90 text-xs text-zinc-400 font-mono">
        <span>{language || 'text'}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

function formatInline(text: string): React.ReactNode[] {
  // Regex to split by code (`...`), bold (**...**), link ([...](...))
  const parts: React.ReactNode[] = []
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200/80 text-[13px] font-mono font-medium"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-zinc-900">
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
            rel={linkMatch[2].startsWith('http') ? 'noreferrer' : undefined}
            className="text-zinc-950 underline underline-offset-4 decoration-zinc-400 hover:decoration-zinc-950 font-medium transition-colors"
          >
            {linkMatch[1]}
          </a>
        )
      } else {
        parts.push(token)
      }
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null

  const lines = content.split('\n')
  const elements: React.ReactNode[] = []

  let inCodeBlock = false
  let codeLanguage = ''
  let codeAccumulator: string[] = []

  let inTable = false
  let tableHeader: string[] = []
  let tableRows: string[][] = []

  let inList = false
  let listItems: string[] = []

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="my-4 space-y-2 list-disc list-inside text-zinc-700 leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx} className="pl-1">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      )
      listItems = []
      inList = false
    }
  }

  const flushTable = (key: number) => {
    if (tableRows.length > 0 || tableHeader.length > 0) {
      elements.push(
        <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            {tableHeader.length > 0 && (
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  {tableHeader.map((th, idx) => (
                    <th key={idx} className="px-4 py-3 font-semibold text-zinc-900">
                      {formatInline(th.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-zinc-200">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-zinc-50/50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-zinc-700">
                      {formatInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableHeader = []
      tableRows = []
      inTable = false
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i]
    const trimmed = rawLine.trim()

    // Handle Code Blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        elements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeAccumulator.join('\n')}
            language={codeLanguage}
          />
        )
        codeAccumulator = []
        codeLanguage = ''
        inCodeBlock = false
      } else {
        // Start of code block
        flushList(i)
        flushTable(i)
        inCodeBlock = true
        codeLanguage = trimmed.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeAccumulator.push(rawLine)
      continue
    }

    // Handle Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList(i)
      const cols = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim())

      // Check if it's the divider row e.g. | :--- | :--- |
      if (cols.every((c) => /^-+:?|:?-+:?$|:?-+:?$/.test(c))) {
        continue
      }

      if (!inTable) {
        inTable = true
        tableHeader = cols
      } else {
        tableRows.push(cols)
      }
      continue
    } else if (inTable) {
      flushTable(i)
    }

    // Handle Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true
      listItems.push(trimmed.slice(2).trim())
      continue
    } else if (inList) {
      flushList(i)
    }

    // Handle Empty lines
    if (!trimmed) {
      continue
    }

    // Handle Headings
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 mt-8 mb-3">
          {formatInline(trimmed.slice(4).trim())}
        </h3>
      )
      continue
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 mt-10 mb-4 pb-2 border-b border-zinc-200/80">
          {formatInline(trimmed.slice(3).trim())}
        </h2>
      )
      continue
    }

    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 mt-12 mb-5">
          {formatInline(trimmed.slice(2).trim())}
        </h1>
      )
      continue
    }

    // Handle Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      elements.push(<hr key={i} className="my-8 border-zinc-200" />)
      continue
    }

    // Handle Blockquote
    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="my-4 pl-4 border-l-4 border-zinc-900 italic text-zinc-700 bg-zinc-50/50 py-2 rounded-r-lg"
        >
          {formatInline(trimmed.slice(2).trim())}
        </blockquote>
      )
      continue
    }

    // Default Paragraph
    elements.push(
      <p key={i} className="my-4 text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
        {formatInline(trimmed)}
      </p>
    )
  }

  // Flush any remaining active state
  flushList(lines.length)
  flushTable(lines.length)

  return <div className="markdown-body max-w-none">{elements}</div>
}
