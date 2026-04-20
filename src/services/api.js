import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchJobListings = async (limit = 10) => {
  const { data } = await axios.get(`${BASE_URL}/products?limit=${limit}`);
  return data.products.map((p) => ({
    id: p.id,
    company: p.brand || p.category || 'Unknown Co.',
    role: p.title,
    description: p.description,
    salary: Math.round(p.price * 1000),
    location: ['Remote', 'New York', 'San Francisco', 'Austin', 'Seattle'][p.id % 5],
    platform: ['LinkedIn', 'Indeed', 'Glassdoor', 'Company Website', 'Referral'][p.id % 5],
  }));
};

export const getCompanyLogoUrl = (domain) => {
  if (!domain) return null;
  return `https://logo.clearbit.com/${domain}`;
};

export const getLogoFromCompany = (company) => {
  if (!company) return null;
  const domainMap = {
    Google: 'google.com',
    Apple: 'apple.com',
    Microsoft: 'microsoft.com',
    Amazon: 'amazon.com',
    Meta: 'meta.com',
    Netflix: 'netflix.com',
    Tesla: 'tesla.com',
    Uber: 'uber.com',
    Airbnb: 'airbnb.com',
    Spotify: 'spotify.com',
  };
  const key = Object.keys(domainMap).find((k) => company.toLowerCase().includes(k.toLowerCase()));
  if (key) return `https://logo.clearbit.com/${domainMap[key]}`;
  const slug = company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return `https://logo.clearbit.com/${slug}.com`;
};
