export class DashboardRepository {
  async getSummary() {
    return {
      assetsAvailable: 0,
      assetsAllocated: 0,
      maintenanceToday: 0,
      activeBookings: 0,
      pendingTransfers: 0,
      upcomingReturns: 0,
    };
  }
}
