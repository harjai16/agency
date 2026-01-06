"use client";

import React, { useState, useEffect, useRef } from 'react';
import faqData from '@/data/faq.json';

const TestPage = () => {
  const [books, setBooks] = useState([]);
 const [loading, setLoading] = useState(false);
 const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('q'); // 'q', 'title', 'author'
  const [showDropdown, setShowDropdown] = useState(false);
  const [allKeywords, setAllKeywords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Extract keywords from books
 useEffect(() => {
    if (books.length > 0) {
      const keywordsSet = new Set();
      books.forEach(book => {
        // Extract from title
        if (book.title) {
          const titleWords = book.title.toLowerCase().split(/\s+/);
          titleWords.forEach(word => {
            if (word.length > 3) keywordsSet.add(word);
          });
        }
        // Extract from author names
        if (book.author_name && Array.isArray(book.author_name)) {
          book.author_name.forEach(author => {
            const authorWords = author.toLowerCase().split(/\s+/);
            authorWords.forEach(word => {
              if (word.length > 3) keywordsSet.add(word);
            });
          });
        }
      });
      setAllKeywords(Array.from(keywordsSet));
    }
  }, [books]);

  const fetchBooks = async (searchQuery, type = 'q', pageNum = 1) => {
    if (!searchQuery.trim()) {
      setBooks([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    try {
      let url = '';
      
      if (type === 'author') {
        // Use authors API for author search
        url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(searchQuery)}`;
      } else {
        // Use books search API
        const params = new URLSearchParams();
        if (type === 'title') {
          params.append('title', searchQuery);
        } else {
          params.append('q', searchQuery);
        }
        params.append('page', pageNum.toString());
        url = `https://openlibrary.org/search.json?${params.toString()}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (type === 'author') {
        // Handle author search results differently
        setBooks(data.docs || []);
        setTotalResults(data.numFound || 0);
      } else {
        setBooks(data.docs || []);
        setTotalResults(data.numFound || 0);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setTotalResults(0);
    } finally {
    setLoading(false);
  }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        setPage(1);
        fetchBooks(search, searchType, 1);
      } else {
        setBooks([]);
        setTotalResults(0);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, searchType]);

  // Filter related questions based on search
  const getFilteredQuestions = () => {
    if (!search.trim()) return [];
    
    const searchLower = search.toLowerCase();
    return faqData.filter(faq => 
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower)
    ).slice(0, 5);
  };

  // Get matching keywords
  const getMatchingKeywords = () => {
    if (!search.trim()) return [];
    
    const searchLower = search.toLowerCase();
    return allKeywords
      .filter(keyword => keyword.includes(searchLower) || searchLower.includes(keyword))
      .slice(0, 8);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleSelectQuestion = (question) => {
    setSearch(question);
    setShowDropdown(false);
    setPage(1);
    fetchBooks(question, searchType, 1);
  };

  const handleSelectKeyword = (keyword) => {
    setSearch(keyword);
    setShowDropdown(false);
    setPage(1);
    fetchBooks(keyword, searchType, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchBooks(search, searchType, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredQuestions = getFilteredQuestions();
  const matchingKeywords = getMatchingKeywords();
  const hasDropdownContent = filteredQuestions.length > 0 || matchingKeywords.length > 0;
  const totalPages = Math.ceil(totalResults / 100); // Open Library returns 100 results per page

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Open Library Book Search
          </h1>
          <p className="text-gray-600">
            Search millions of books from the Open Library database
          </p>
        </div>

        {/* Search Type Selector */}
        <div className="mb-4 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSearchType('q');
              if (search.trim()) {
                setPage(1);
                fetchBooks(search, 'q', 1);
              }
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'q'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            General Search
          </button>
          <button
            onClick={() => {
              setSearchType('title');
              if (search.trim()) {
                setPage(1);
                fetchBooks(search, 'title', 1);
              }
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'title'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Search by Title
          </button>
          <button
            onClick={() => {
              setSearchType('author');
              if (search.trim()) {
                setPage(1);
                fetchBooks(search, 'author', 1);
              }
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'author'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Search by Author
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(search.trim().length > 0 && hasDropdownContent)}
              placeholder={
                searchType === 'title'
                  ? "Search by book title..."
                  : searchType === 'author'
                  ? "Search by author name..."
                  : "Search for books, authors, or keywords..."
              }
              className="w-full px-4 py-4 pl-12 pr-12 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {loading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && hasDropdownContent && (
            <div 
              ref={dropdownRef}
              className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-h-96 overflow-y-auto"
            >
              {filteredQuestions.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Related Questions
                  </div>
                  {filteredQuestions.map((faq, idx) => (
                    <button
                      key={faq.id || idx}
                      onClick={() => handleSelectQuestion(faq.question)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">
                        {faq.question}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {faq.answer}
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {matchingKeywords.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Related Keywords
                  </div>
                  <div className="flex flex-wrap gap-2 px-3 pb-2">
                    {matchingKeywords.map((keyword, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectKeyword(keyword)}
                        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors font-medium"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Searching Open Library...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-600 font-medium">No books found</p>
              <p className="mt-2 text-sm text-gray-500">
                {search ? `Try a different search term or change search type` : 'Start typing to search for books'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Found <span className="font-semibold text-gray-900">{totalResults.toLocaleString()}</span> {totalResults === 1 ? 'book' : 'books'}
                  {page > 1 && ` (Page ${page} of ${totalPages})`}
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book, index) => {
                  const authors = book.author_name || (book.author_name ? [book.author_name] : []);
                  const publishYear = book.first_publish_year || book.publish_year?.[0];
                  
                  return (
                    <div
                      key={book.key || index}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
                    >
                      <div className="flex flex-col h-full">
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {book.title || 'Untitled'}
                          </h3>
                          
                          {authors.length > 0 && (
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Author{authors.length > 1 ? 's' : ''}:</span>{' '}
                              {authors.slice(0, 3).join(', ')}
                              {authors.length > 3 && ` +${authors.length - 3} more`}
                            </p>
                          )}

                          {publishYear && (
                            <p className="text-xs text-gray-500 mb-3">
                              Published: {publishYear}
                            </p>
                          )}

                          {book.subject && book.subject.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {book.subject.slice(0, 3).map((subject, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          )}

                          {book.isbn && book.isbn.length > 0 && (
                            <p className="text-xs text-gray-400 mt-auto">
                              ISBN: {book.isbn[0]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            page === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
