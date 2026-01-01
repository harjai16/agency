"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '@/componenets/ui/Button';
import { useToast } from '@/componenets/global/Toast';

const JobPostAdmin = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: 'Full-time',
    location: 'Remote',
    description: '',
    requirements: '',
    status: 'active'
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('jobPostAuth');
    if (authStatus === 'true') {
      setAuthenticated(true);
      fetchJobs();
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchJobs();
    }
  }, [authenticated, filter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.authenticated) {
        setAuthenticated(true);
        sessionStorage.setItem('jobPostAuth', 'true');
        fetchJobs();
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/jobs' 
        : `/api/jobs?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      showToast('Failed to load jobs', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const requirementsArray = formData.requirements
        .split('\n')
        .map(r => r.trim())
        .filter(r => r.length > 0);

      const jobData = {
        ...formData,
        requirements: requirementsArray
      };

      const url = editingJob 
        ? `/api/jobs/${editingJob._id}` 
        : '/api/jobs';
      
      const method = editingJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (data.success) {
        showToast(editingJob ? 'Job updated successfully' : 'Job created successfully', 'success');
        setShowForm(false);
        setEditingJob(null);
        resetForm();
        fetchJobs();
      } else {
        setError(data.error || 'Failed to save job');
      }
    } catch (err) {
      setError('Failed to save job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        showToast('Job deleted successfully', 'success');
        fetchJobs();
      } else {
        showToast(data.error || 'Failed to delete job', 'error');
      }
    } catch (err) {
      showToast('Failed to delete job. Please try again.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      type: job.type || 'Full-time',
      location: job.location || 'Remote',
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
      status: job.status || 'active'
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      type: 'Full-time',
      location: 'Remote',
      description: '',
      requirements: '',
      status: 'active'
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-sm text-gray-500 mb-6">Enter password to access job post management</p>
          
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

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Job Post Management
              </h1>
              <p className="text-sm text-gray-500">Create, edit, and manage job postings</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="ghost"
                onClick={() => router.push('/')}
              >
                Home
              </Button>
              <Button onClick={() => { setShowForm(true); setEditingJob(null); resetForm(); }}>
                + Create New Job
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({jobs.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({jobs.filter(j => j.status === 'active').length})
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'closed'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Closed ({jobs.filter(j => j.status === 'closed').length})
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => { setShowForm(false); setEditingJob(null); resetForm(); }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingJob ? 'Edit Job Post' : 'Create New Job Post'}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department *
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Engineering, Design, Marketing"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Remote, On-site, Hybrid"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements (one per line)
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      placeholder="5+ years of experience&#10;Strong proficiency in React&#10;Experience with TypeScript"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? 'Saving...' : editingJob ? 'Update Job' : 'Create Job'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => { setShowForm(false); setEditingJob(null); resetForm(); }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-sm text-gray-500">
                      No jobs found. Create your first job posting!
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{job.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{job.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{job.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{job.location}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(job.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(job)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            disabled={deletingId === job._id}
                            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                          >
                            {deletingId === job._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostAdmin;

