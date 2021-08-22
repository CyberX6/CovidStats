<?php

namespace App\Console\Commands;

use App\Models\Country;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Psy\Util\Json;

class SeedCountries extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:countries';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert countries to database from api';

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
     * @return int
     */
    public function handle(): int
    {
        $response = Http::get(config('urls.fetchCountriesList'));
        $insertList = [];

        if ($response->ok()) {
            $countries = $response->object();

            foreach ($countries as $country) {
                $insertList[] = [
                    'code' => $country->code,
                    'name' => Json::encode($country->name),
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ];
            }
        }

        return Country::insertOrIgnore($insertList);
    }
}
