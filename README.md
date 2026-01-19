# LogiFlow Dashboard

This project is a faithful replication of the LogiFlow dashboard using Angular (Standalone Components) and Tailwind CSS.

## Structure

The project follows a scalable and clean architecture:

- **src/app/core**: Singleton services and data models.
  - `shipment.service.ts`: Mock data provider using RxJS Observables.
  - `models/`: Interface definitions.
- **src/app/layout**: Application shell components.
  - `sidebar`, `topbar`: Navigation components.
  - `main-layout`: Wrapper component handling the overall layout structure.
- **src/app/features**: Page-level components.
  - `dashboard`: The main specific dashboard page that orchestrates the sub-components.
- **src/app/shared**: Reusable UI components.
  - `stats-card`: Reusable card for key metrics.
  - `shipment-volume-chart`: Lightweight CSS-only bar chart implementation.
  - `live-fleet-map`: SVG-based placeholder for the map visualization.
  - `recent-shipments-table`: Data table with badge statuses.

## Technical Decisions

1.  **Standalone Components**: Used modern Angular Standalone API to reduce boilerplate and complexity (no `NgModule` required).
2.  **Tailwind CSS**: Used for all styling to ensure a consistent design system and "pixel-perfect" replication without writing custom CSS files where possible.
3.  **No Heavy Libraries**:
    - Charts are implemented with pure CSS/HTML for performance and simplicity given the requirements.
    - Icons are raw SVG to avoid dependency overhead for a few icons.
4.  **Reactive Data**: `ShipmentService` returns Observables, and components use the `AsyncPipe` for declarative data binding and automatic subscription management.
5.  **Clean Code**: strict typing with Interfaces and Enums (`ShipmentStatus`).

## Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   ng serve
   ```
3. Open `http://localhost:4200`.
