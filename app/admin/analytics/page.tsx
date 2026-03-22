import AdminAnalyticsTable from '@/components/admin-analytics-table'

export default function AdminAnalyticsPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground">Performance metrics across all listings. Sort by any column to find your top and bottom performers.</p>
      </div>

      <AdminAnalyticsTable />
    </>
  )
}
