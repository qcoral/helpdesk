import Airtable from 'airtable';

// Initialize Airtable with your Personal Access Token
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

// Fetch all pending requests
export const fetchRequests = async () => {
  try {
    const records = await base(tableName)
      .select({
        view: 'Grid view', // Replace with your view name if necessary
        filterByFormula: '{status} = "Pending"', // Only fetch pending requests
        sort: [{ field: 'created_at', direction: 'asc' }], // Sort by creation date
      })
      .all();
    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
};

// Update the status of a request
export const updateRequestStatus = async (id, status) => {
  try {
    const record = await base(tableName).update(id, {
      status, // Update the status field
    });
    return record;
  } catch (error) {
    console.error('Error updating request:', error);
    throw error;
  }
};