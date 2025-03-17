"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  id: number;
  name: string;
}

interface SearchInputProps {
  onSearch: (query: string) => Promise<SearchResult[]>;
  link: string;
  linkWithName: boolean;
}

export default function SearchInput({
  onSearch,
  link,
  linkWithName,
}: SearchInputProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      onSearch(query)
        .then((data: SearchResult[]) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query, onSearch]);

  return (
    <div className="flex items-center gap-2 h-14">
      <div className="relative w-[22vw]">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black z-10"
        />
        <input
          className="w-full h-[2.25vw] rounded-full pl-10 pr-4 bg-white shadow-sm border border-neutral-200 text-sm focus:outline-none placeholder-secondary"
          placeholder="Buscar cotización"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {results.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border border-neutral-200 rounded-2xl shadow-lg z-10 overflow-hidden">
            <div className="py-1">
              {results.map((result) => (
                <Link
                  key={result.id}
                  className="block px-4 py-2 hover:bg-neutral-50 text-sm"
                  href={`${link}/${linkWithName ? result.name : result.id}`}
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
