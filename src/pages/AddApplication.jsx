import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApplications } from '../hooks/useApplications';
import { STATUSES, PLATFORMS } from '../utils/helpers';
import './FormPage.css';

const schema = yup.object({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Job role is required'),
  appliedDate: yup.string().required('Applied date is required'),
  location: yup.string(),
  salary: yup.number().typeError('Enter a valid number').nullable().transform((v, o) => (o === '' ? null : v)),
  platform: yup.string(),
  status: yup.string().required(),
  interviewDate: yup.string(),
  notes: yup.string(),
});

export default function AddApplication() {
  const { addApplication } = useApplications();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 'Applied',
      appliedDate: new Date().toISOString().slice(0, 10),
    },
  });

  const onSubmit = (data) => {
    addApplication(data);
    toast.success('Application added!');
    navigate('/applications');
  };

  return (
    <div className="page form-page">
      <div className="page-header">
        <div>
          <h1>Add Application</h1>
          <p className="page-subtitle">Track a new job application</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/applications')}>
          Cancel
        </button>
      </div>

      <form className="app-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <h3 className="section-title">Required Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name <span className="req">*</span></label>
              <input {...register('company')} placeholder="e.g. Google" />
              {errors.company && <p className="error">{errors.company.message}</p>}
            </div>
            <div className="form-group">
              <label>Job Role <span className="req">*</span></label>
              <input {...register('role')} placeholder="e.g. Frontend Engineer" />
              {errors.role && <p className="error">{errors.role.message}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Applied Date <span className="req">*</span></label>
              <input type="date" {...register('appliedDate')} />
              {errors.appliedDate && <p className="error">{errors.appliedDate.message}</p>}
            </div>
            <div className="form-group">
              <label>Status</label>
              <select {...register('status')}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Optional Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input {...register('location')} placeholder="e.g. Remote" />
            </div>
            <div className="form-group">
              <label>Salary (USD)</label>
              <input type="number" {...register('salary')} placeholder="e.g. 120000" />
              {errors.salary && <p className="error">{errors.salary.message}</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Platform</label>
              <select {...register('platform')}>
                <option value="">Select platform</option>
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Interview Date</label>
              <input type="date" {...register('interviewDate')} />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea {...register('notes')} rows={4} placeholder="Any notes about this role..." />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Application'}
          </button>
        </div>
      </form>
    </div>
  );
}
