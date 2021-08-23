<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Seed countries table
  ```sh
  php artisan seed:countries
  ```

Create stats jobs
  ```sh
  php artisan fetch:stats
  ```

Run stats jobs
  ```sh
  php artisan queue:work
  ```

Run scheduler to run jobs hourly
  ```sh
  php artisan schedule:work
  ```
