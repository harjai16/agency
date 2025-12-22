"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import { useToast } from "@/componenets/global/Toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const RequestQueryPage = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { showToast } = useToast();

  // Check authentication on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('requestQueryAuth');
    if (authStatus === 'true') {
      setAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  // Ensure normal cursor on this page
  useEffect(() => {
    document.body.style.cursor = 'auto';
    const style = document.createElement('style');
    style.id = 'request-query-cursor-style';
    style.textContent = `
      body, body * {
        cursor: auto !important;
      }
      a, button, [role="button"], input, textarea, select {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = '';
      const existingStyle = document.getElementById('request-query-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchSubmissions();
    }
  }, [authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.authenticated) {
        setAuthenticated(true);
        sessionStorage.setItem('requestQueryAuth', 'true');
        fetchSubmissions();
      } else {
        setAuthError(data.error || 'Invalid password');
      }
    } catch (err) {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/request-query");
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.submissions || []);
      } else {
        showToast("Failed to load submissions", "error");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      showToast("Failed to load submissions", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/request-query/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        showToast("Submission deleted successfully", "success");
        setSubmissions((prev) => prev.filter((s) => s._id !== id));
      } else {
        showToast(data.error || "Failed to delete submission", "error");
      }
    } catch (error) {
      console.error("Error deleting submission:", error);
      showToast("Failed to delete submission", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Login form
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-sm text-gray-500 mb-6">Enter password to access request query management</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter password"
                required
              />
            </div>

            {authError && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {authError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={authLoading}
            >
              {authLoading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          {...fadeUp(0)}
          className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                Form Submissions
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
                Request Query Management
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl">
                View and manage all form submissions from across the website.
              </p>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="flex-shrink-0"
            >
              Home
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Submissions List */}
      <Section className="py-8 md:py-12">
        <div className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No submissions found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission._id}
                  {...fadeUp(index * 0.1)}
                  className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Page Name Badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                          {submission.pageName || "Unknown Page"}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {formatDate(submission.createdAt)}
                        </span>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                            Name
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {submission.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                            Email
                          </p>
                          <p className="text-sm text-gray-900 break-all">
                            {submission.email}
                          </p>
                        </div>
                        {submission.company && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                              Company
                            </p>
                            <p className="text-sm text-gray-900">
                              {submission.company}
                            </p>
                          </div>
                        )}
                        {submission.projectType && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                              Project Type
                            </p>
                            <p className="text-sm text-gray-900">
                              {submission.projectType}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      {submission.message && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                            Message
                          </p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {submission.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <div className="flex-shrink-0">
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(submission._id)}
                        disabled={deletingId === submission._id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        {deletingId === submission._id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
};

export default RequestQueryPage;

