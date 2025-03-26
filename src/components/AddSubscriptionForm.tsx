
import React, { useState } from 'react';
import { Subscription, SubscriptionCategory } from '@/types/subscription';

interface AddSubscriptionFormProps {
  onSubmit: (subscription: Omit<Subscription, 'id'>) => void;
  onCancel: () => void;
  initialData?: Subscription;
}

const AddSubscriptionForm: React.FC<AddSubscriptionFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const [formData, setFormData] = useState<Omit<Subscription, 'id'>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    logo: initialData?.logo || '',
    amount: initialData?.amount || 0,
    currency: initialData?.currency || 'USD',
    cycle: initialData?.cycle || 'monthly',
    category: initialData?.category || SubscriptionCategory.Entertainment,
    color: initialData?.color || '#3B82F6',
    startDate: initialData?.startDate || new Date(),
    nextBillingDate: initialData?.nextBillingDate || new Date(),
    active: initialData?.active ?? true,
    url: initialData?.url || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'amount') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === 'startDate' || name === 'nextBillingDate') {
      setFormData(prev => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Netflix, Spotify, etc."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            Website URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="9.99"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="currency" className="text-sm font-medium">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="cycle" className="text-sm font-medium">
            Billing Cycle <span className="text-red-500">*</span>
          </label>
          <select
            id="cycle"
            name="cycle"
            required
            value={formData.cycle}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.values(SubscriptionCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate.toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nextBillingDate" className="text-sm font-medium">
            Next Billing Date <span className="text-red-500">*</span>
          </label>
          <input
            id="nextBillingDate"
            name="nextBillingDate"
            type="date"
            required
            value={formData.nextBillingDate.toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="color" className="text-sm font-medium">
            Color
          </label>
          <div className="flex gap-2">
            <input
              id="color"
              name="color"
              type="color"
              value={formData.color}
              onChange={handleChange}
              className="h-10 w-10 rounded border border-input bg-background p-0 cursor-pointer"
            />
            <input
              type="text"
              value={formData.color}
              onChange={handleChange}
              name="color"
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="#3B82F6"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="logo" className="text-sm font-medium">
            Logo URL
          </label>
          <input
            id="logo"
            name="logo"
            type="url"
            value={formData.logo || ''}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Add a description..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="active"
          name="active"
          type="checkbox"
          checked={formData.active}
          onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="active" className="text-sm font-medium">
          Active subscription
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-input bg-background text-sm font-medium transition-colors hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90"
        >
          {initialData ? 'Update' : 'Add'} Subscription
        </button>
      </div>
    </form>
  );
};

export default AddSubscriptionForm;
