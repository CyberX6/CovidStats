<?php

namespace App\Console\Commands;

use App\Jobs\ProcessCovidStats;
use App\Models\Country;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FetchStats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:stats';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch Covid Stats';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return bool
     */
    public function handle(): bool
    {
        $countries = Country::all();

        if ($countries->isEmpty()) {
            $this->call('seed:countries');
            $countries = Country::all();
        }

        $start = Carbon::now();

        foreach ($countries as $country) {
            $job = new ProcessCovidStats($country->code);
            $job->delay($start->addSeconds(5));

            dispatch($job);
        }

        return true;
    }
}
