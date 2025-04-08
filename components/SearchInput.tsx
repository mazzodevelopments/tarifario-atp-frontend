"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react"; // Importamos el icono X
import Link from "next/link";

interface SearchResult {
  id: number;
  name: string;
  step?: number;
}

interface SearchInputProps {
  placeholder: string;
  onSearch: (query: string) => Promise<SearchResult[]>;
  link: string | ((result: SearchResult) => string);
  linkWithName?: boolean;
}

export default function SearchInput({
  placeholder,
  onSearch,
  link,
  linkWithName = false,
}: SearchInputProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const clearInput = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.length > 0) {
        setIsLoading(true);
        setResults([]);
        setHasSearched(true);
        onSearch(query)
          .then((data: SearchResult[]) => {
            setResults(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
          });
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  const getResultLink = (result: SearchResult) => {
    if (typeof link === "function") {
      return link(result);
    }
    return `${link}/${linkWithName ? result.name : result.id}`;
  };

  return (
    <div className="flex items-center gap-2 h-9">
      <div className="relative w-[22vw] h-full">
        <Search
          size={18}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 z-10"
        />
        <input
          className="w-full h-full rounded-full px-8 mt-[0.4px] bg-white text shadow-sm border border-neutral-200 text-sm focus:outline-none pt-[0.5px]"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query.length > 0 && (
          <button
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 z-10"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}

        {(isLoading ||
          (hasSearched && results.length === 0) ||
          results.length > 0) && (
          <div className="absolute w-full mt-1 bg-white border border-neutral-200 rounded-2xl shadow-lg z-10 overflow-hidden">
            <div
              className={`overflow-y-auto max-h-[60vh] ${(isLoading || (hasSearched && results.length === 0)) && "text-center"}`}
            >
              {isLoading && (
                <span className="px-4 py-2 text-xs">Cargando...</span>
              )}
              {!isLoading && hasSearched && results.length === 0 && (
                <span className="px-4 py-2 text-xs">No hay resultados</span>
              )}
              {results.map((result) => (
                <Link
                  key={result.id}
                  className="block px-4 py-2 hover:bg-neutral-50 text-sm"
                  href={getResultLink(result)}
                >
                  {result.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
